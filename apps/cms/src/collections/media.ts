import type { CollectionConfig } from "payload";
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
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			label: "替代文本",
			type: "text",
			required: true,
		},
		{
			name: "caption",
			label: "标题",
			type: "text",
		},
		{
			name: "blurDataUrl",
			label: "模糊数据URL",
			type: "text",
			admin: {
				description: "用于在客户端显示模糊的预览图",
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
