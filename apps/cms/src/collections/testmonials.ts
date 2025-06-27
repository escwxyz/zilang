import type { CollectionConfig } from "payload";

export const Testmonials: CollectionConfig = {
	slug: "testmonials",
	labels: {
		singular: "客户评价",
		plural: "客户评价",
	},
	admin: {
		group: "内容相关",
		useAsTitle: "name",
	},
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
					value: "one",
				},
				{
					label: "2 星",
					value: "two",
				},
				{
					label: "3 星",
					value: "three",
				},
				{
					label: "4 星",
					value: "four",
				},
				{
					label: "5 星",
					value: "five",
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
};
