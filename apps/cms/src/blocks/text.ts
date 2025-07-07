import type { Block } from "payload";

export const TextBlock: Block = {
	slug: "text",
	interfaceName: "TextBlock",
	labels: {
		singular: "文本区块",
		plural: "文本区块",
	},
	fields: [
		{
			name: "content",
			type: "richText",
			label: "内容",
			required: true,
		},
		{
			name: "width",
			type: "select",
			label: "宽度",
			options: [
				{
					label: "100%",
					value: "full",
				},
				{
					label: "1/4",
					value: "1/4",
				},
				{
					label: "1/2",
					value: "1/2",
				},
				{
					label: "3/4",
					value: "3/4",
				},
			],
			defaultValue: "full",
		},
	],
};
