// In a Cloudflare Worker or Astro server context

import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";

export function getDrizzleDB(env: { DB: D1Database }) {
	return drizzle(env.DB);
}
