// @ts-check

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
// import { imageService } from "@unpic/astro/service";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server", // TODO: static site

	adapter: cloudflare({
		// imageService: "cloudflare",
	}),

	image: {
		// service: imageService({}),
	},

	vite: {
		plugins: [tailwindcss()],
	},

	redirects: {
		"/products": "/products/pump-controllers",
		"/home": "/",
	},
});
