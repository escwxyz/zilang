import type { Block } from "payload";

export const MediaBlock: Block = {
	slug: "mediaBlock",
	interfaceName: "MediaBlockType",
	labels: {
		singular: "媒体区块",
		plural: "媒体区块",
	},
	fields: [
		{
			name: "media",
			label: "媒体",
			admin: {
				description: "选择一个媒体文件",
			},
			type: "relationship",
			relationTo: "media",
			required: true,
		},
		{
			name: "description",
			label: "描述",
			type: "text",
		},
	],
};
