import type { Block } from "payload";

export const FaqsBlock: Block = {
	slug: "faqs",
	interfaceName: "FaqsBlock",
	labels: {
		singular: "常见问题区块",
		plural: "常见问题区块",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "标题",
			required: true,
		},
		{
			name: "description",
			type: "text",
			label: "描述",
		},
		{
			name: "faqs",
			relationTo: "faqs",
			type: "relationship",
			label: "常见问题",
			hasMany: true,
			minRows: 3,
			maxRows: 6,
			filterOptions: () => {
				return {
					type: {
						equals: "general",
					},
				};
			},
		},
	],
};
