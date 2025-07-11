import { SlugField } from "@nouance/payload-better-fields-plugin/Slug";
import type { CollectionConfig } from "payload";
import { isAdmin, isAuthenticated, isAuthenticatedOrPublished } from "@/access";
import { CarouselHeroBlock } from "@/blocks/carousel-hero";
import { ContactFormBlock } from "@/blocks/contact-form";
import { CTABlock } from "@/blocks/cta";
import { FaqsBlock } from "@/blocks/faqs";
import { FeaturedProductsBlock } from "@/blocks/featured-products";
import { FeaturesBlock } from "@/blocks/features";
import { MediaBlock } from "@/blocks/media";
import { MediaGridBlock } from "@/blocks/media-grid";
import { TeamBlock } from "@/blocks/team";
import { TestimonialsBlock } from "@/blocks/testimonials";
import { TextBlock } from "@/blocks/text";
import { TimelineBlock } from "@/blocks/timeline";

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "网站页面",
		plural: "网站页面",
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
		SlugField("title", {
			slugOverrides: {
				label: "页面别名",
				required: true,
			},
		})[0],
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
							blocks: [
								MediaBlock,
								CarouselHeroBlock,
								FeaturedProductsBlock,
								TestimonialsBlock,
								FaqsBlock,
								TextBlock,
								FeaturesBlock,
								MediaGridBlock,
								ContactFormBlock,
								TeamBlock,
								TimelineBlock,
								CTABlock,
							],
						},
					],
				},
			],
		},
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100,
			},
		},
		maxPerDoc: 5,
	},
};
