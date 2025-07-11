import { PayloadSDK } from "@repo/sdk";
import type { Config } from "@repo/types";
import type { CacheOptions, D1Cache } from "./cache";

export const PAYLOAD_API_URL = `${import.meta.env.PAYLOAD_SITE_URL}/api`;

export const sdk = new PayloadSDK<Config>({
	baseURL: PAYLOAD_API_URL,
});

export async function getCachedPayloadData<T>(
	cache: D1Cache,
	cacheKey: string,
	fetcher: () => Promise<T>,
	options: CacheOptions = {
		ttl: 60 * 60 * 24,
		staleWhileRevalidate: 60 * 60 * 24,
		skipCache: false,
	},
): Promise<T> {
	if (options.skipCache) {
		return fetcher();
	}

	const cachedData = await cache.get<T>(cacheKey);

	if (cachedData?.data) {
		if (cachedData.isStale) {
			revalidateInBackground(cache, cacheKey, fetcher, options);
		}
		return cachedData.data;
	}

	const freshData = await fetcher();
	await cache.set(cacheKey, freshData, options);

	return freshData;
}

async function revalidateInBackground<T>(
	cache: D1Cache,
	cacheKey: string,
	fetcher: () => Promise<T>,
	options: { ttl?: number; staleWhileRevalidate?: number },
): Promise<void> {
	try {
		const freshData = await fetcher();
		await cache.set(cacheKey, freshData, options);
	} catch (error) {
		console.error("Background revalidation failed:", error);
	}
}
