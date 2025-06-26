import { seoPlugin } from "@payloadcms/plugin-seo";
import type { Plugin } from "payload";

export const plugins: Plugin[] = [
	seoPlugin({
		collections: ["pages"],
		uploadsCollection: "media",
		generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
		generateDescription: ({ doc }) => doc?.excerpt,
		generateImage: ({ doc }) => doc?.coverImage,
	}),
];
