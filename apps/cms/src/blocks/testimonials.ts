import type { Block } from "payload";

export const TestimonialsBlock: Block = {
	slug: "testimonials",
	interfaceName: "TestimonialsBlock",
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
			type: "array",
			label: "客户评价",
			labels: {
				singular: "客户评价",
				plural: "客户评价",
			},
			minRows: 3,
			maxRows: 6,
			fields: [
				{
					name: "name",
					type: "text",
					label: "客户姓名或昵称",
					required: true,
				},
				{
					name: "avatar",
					type: "upload",
					label: "客户头像",
					relationTo: "media",
				},
				{
					name: "country",
					type: "text",
					label: "国家",
					required: true,
					defaultValue: "United States",
				},
				{
					name: "star",
					type: "select",
					label: "星级",
					required: true,
					options: [
						{
							label: "1 星",
							value: "1",
						},
						{
							label: "2 星",
							value: "2",
						},
						{
							label: "3 星",
							value: "3",
						},
						{
							label: "4 星",
							value: "4",
						},
						{
							label: "5 星",
							value: "5",
						},
					],
				},
				{
					name: "content",
					type: "textarea",
					label: "内容",
					required: true,
				},
			],
		},
	],
};
