import type { Block } from "payload";

export const TestimonialsBlock: Block = {
	slug: "testimonialsBlock",
	interfaceName: "TestimonialsBlockType",
	labels: {
		singular: "客户评价区块",
		plural: "客户评价区块",
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
			name: "testimonials",
			type: "relationship",
			relationTo: "testimonials",
			hasMany: true,
			required: true,
			maxRows: 6,
		},
	],
};
