import type { D1Database } from "@cloudflare/workers-types";
import { eq, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { cacheEntries } from "../db/schema";

export interface CacheOptions {
	ttl?: number;
	staleWhileRevalidate?: number;
	tags?: string[];
	contentType?: string;
	skipCache?: boolean;
}

export class D1Cache {
	private db: ReturnType<typeof drizzle>;

	constructor(d1: D1Database) {
		this.db = drizzle(d1);
	}
	async get<T>(key: string): Promise<{ data: T | null; isStale: boolean }> {
		try {
			const entries = await this.db
				.select()
				.from(cacheEntries)
				.where(eq(cacheEntries.id, key))
				.limit(1);

			if (entries.length === 0) {
				return { data: null, isStale: true };
			}

			const entry = entries[0];
			const now = new Date();

			// If expired, delete and return null
			if (entry.expiresAt && entry.expiresAt < now) {
				await this.delete(key);
				return { data: null, isStale: true };
			}

			const isStale = entry.revalidateAfter
				? entry.revalidateAfter < now
				: false;
			const data = entry.data ? JSON.parse(entry.data) : null;

			return { data: data as T, isStale };
		} catch (error: any) {
			if (error instanceof Error && error.message?.includes("no such table")) {
				throw new Error(
					`[D1Cache] Table "cache_entries" does not exist. ` +
						`Did you run your database migrations? ` +
						`Original error: ${error.message}`,
				);
			}
			throw new Error(
				`[D1Cache] Failed to get cache entry: ${error.toString()}`,
			);
		}
	}

	async set<T>(
		key: string,
		data: T,
		options: CacheOptions = {},
	): Promise<void> {
		const now = new Date();
		const ttl = options.ttl || 3600; // Default 1 hour
		const swr = options.staleWhileRevalidate || 300; // Default 5 minutes

		const expiresAt = new Date(now.getTime() + ttl * 1000);
		const revalidateAfter = new Date(now.getTime() + swr * 1000);

		await this.db
			.insert(cacheEntries)
			.values({
				id: key,
				data: JSON.stringify(data),
				createdAt: now,
				expiresAt,
				revalidateAfter,
				contentType: options.contentType || null,
				tags: options.tags ? JSON.stringify(options.tags) : null,
			})
			.onConflictDoUpdate({
				target: cacheEntries.id,
				set: {
					data: JSON.stringify(data),
					createdAt: now,
					expiresAt,
					revalidateAfter,
					contentType: options.contentType || null,
					tags: options.tags ? JSON.stringify(options.tags) : null,
				},
			});
	}

	async invalidateByTags(tags: string[]): Promise<void> {
		// Get all entries that contain any of the specified tags
		const entries = await this.db.select().from(cacheEntries);

		const toDelete = entries.filter((entry) => {
			if (!entry.tags) return false;
			const entryTags = JSON.parse(entry.tags);
			return tags.some((tag) => entryTags.includes(tag));
		});

		if (toDelete.length > 0) {
			const ids = toDelete.map((entry) => entry.id);
			await Promise.all(ids.map((id) => this.delete(id)));
		}
	}

	async invalidateByContentType(contentType: string): Promise<void> {
		await this.db
			.delete(cacheEntries)
			.where(eq(cacheEntries.contentType, contentType));
	}

	async cleanup(): Promise<void> {
		const now = new Date();
		await this.db.delete(cacheEntries).where(lt(cacheEntries.expiresAt, now));
	}

	async delete(key: string): Promise<void> {
		await this.db.delete(cacheEntries).where(eq(cacheEntries.id, key));
	}
	async getStats(): Promise<{ total: number; expired: number; stale: number }> {
		const all = await this.db.select().from(cacheEntries);
		const now = new Date();

		const expired = all.filter(
			(entry) => entry.expiresAt && entry.expiresAt < now,
		).length;
		const stale = all.filter(
			(entry) =>
				entry.revalidateAfter &&
				entry.revalidateAfter < now &&
				(!entry.expiresAt || entry.expiresAt >= now),
		).length;

		return {
			total: all.length,
			expired,
			stale,
		};
	}
}
