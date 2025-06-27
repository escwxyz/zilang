import { SlugField } from "@nouance/payload-better-fields-plugin/Slug";
import type { CollectionConfig } from "payload";
import { isAdmin, isAuthenticated, isAuthenticatedOrPublished } from "@/access";
import { HeroBlock } from "@/blocks/hero";
import { MediaBlock } from "@/blocks/media";

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "页面",
		plural: "页面",
	},
	admin: {
		group: "内容相关",
		useAsTitle: "title",
	},
	access: {
		read: isAuthenticatedOrPublished,
		create: isAuthenticated,
		update: isAuthenticated,
		delete: isAdmin,
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "页面标题",
			required: true,
		},
		...SlugField(),
		{
			type: "tabs",
			tabs: [
				{
					label: "页面内容",
					admin: {
						description:
							"你可以根据需求为页面添加不同的内容区块，允许调节顺序。",
					},
					fields: [
						{
							name: "content",
							label: "内容区块",
							labels: {
								singular: "内容区块",
								plural: "内容区块",
							},
							type: "blocks",
							required: true,
							admin: {
								initCollapsed: true,
							},
							blocks: [MediaBlock, HeroBlock],
						},
					],
				},
			],
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 1000,
			},
		},
		maxPerDoc: 5,
	},
};
