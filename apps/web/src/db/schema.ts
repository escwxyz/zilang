import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cacheEntries = sqliteTable("cache_entries", {
	id: text("id").primaryKey(),
	data: text("data"), // JSON stringified data
	createdAt: integer("created_at", { mode: "timestamp" }),
	expiresAt: integer("expires_at", { mode: "timestamp" }),
	revalidateAfter: integer("revalidate_after", { mode: "timestamp" }),
	contentType: text("content_type"), // e.g., 'post', 'page', 'collection'
	tags: text("tags"), // JSON array of cache tags for bulk invalidation
});
