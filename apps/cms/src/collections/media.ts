import type { CollectionConfig } from "payload";
import { isPublic } from "@/access";
import { generateBlurDataUrl } from "@/hooks/generate-blurdata-url";

export const Media: CollectionConfig = {
	slug: "media",
	labels: {
		singular: "媒体",
		plural: "媒体",
	},
	admin: {
		group: "媒体管理",
	},
	access: {
		read: isPublic,
	},
	fields: [
		{
			name: "alt",
			label: "替代文本",
			admin: {
				description:
					"替代文本是媒体内容的描述，当媒体无法显示时，替代文本会显示在客户端",
			},
			type: "text",
			required: true,
		},
		{
			name: "caption",
			label: "说明",
			type: "text",
		},
		{
			name: "blurDataUrl",
			label: "模糊数据URL",
			type: "text",
			admin: {
				description: "用于在客户端显示模糊的预览图，无需手动设置",
				position: "sidebar",
				readOnly: true,
			},
		},
	],
	upload: {
		mimeTypes: ["image/*", "video/*", "application/pdf"],
	},
	hooks: {
		beforeChange: [generateBlurDataUrl],
	},
};
