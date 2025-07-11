import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ request }, next) => {
	const url = new URL(request.url);

	if (
		url.pathname.startsWith("/_actions/") ||
		url.pathname.startsWith("/api/")
	) {
		return next();
	}

	return next();
});
