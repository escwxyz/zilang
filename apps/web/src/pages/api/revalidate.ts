import type { APIRoute } from "astro";
import { getDrizzleDB } from "@/db/client";
import { D1Cache } from "@/lib/cache";

export const POST: APIRoute = async ({ request, locals }) => {
	const db = getDrizzleDB(locals.runtime.env);

	const cache = new D1Cache(db.$client);

	const { cacheKey } = (await request.json()) as { cacheKey: string };

	try {
		await cache.delete(cacheKey);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
