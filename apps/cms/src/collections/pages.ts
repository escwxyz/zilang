import { SlugField } from "@nouance/payload-better-fields-plugin/Slug";
import {
	FixedToolbarFeature,
	HeadingFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { MediaBlock } from "@/blocks/media";

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "页面",
		plural: "页面",
	},
	admin: {
		group: "内容相关",
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
					label: "页面横幅",
					admin: {
						description:
							"页面横幅是页面顶部的区域，通常用于展示页面主题或吸引用户注意。",
					},
					fields: [
						{
							type: "group",
							name: "hero",
							fields: [
								{
									name: "type",
									type: "select",
									defaultValue: "lowImpact",
									label: "Type",
									options: [
										{
											label: "None",
											value: "none",
										},
										{
											label: "High Impact",
											value: "highImpact",
										},
										{
											label: "Medium Impact",
											value: "mediumImpact",
										},
										{
											label: "Low Impact",
											value: "lowImpact",
										},
									],
									required: true,
								},
								{
									name: "richText",
									type: "richText",
									editor: lexicalEditor({
										features: ({ rootFeatures }) => {
											return [
												...rootFeatures,
												HeadingFeature({
													enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
												}),
												FixedToolbarFeature(),
												InlineToolbarFeature(),
											];
										},
									}),
									label: false,
								},
							],
						},
					],
				},

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
							blocks: [MediaBlock],
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
