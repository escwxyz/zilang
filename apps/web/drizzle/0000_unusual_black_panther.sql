CREATE TABLE `cache_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text,
	`created_at` integer,
	`expires_at` integer,
	`revalidate_after` integer,
	`content_type` text,
	`tags` text
);
