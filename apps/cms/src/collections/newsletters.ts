import type { CollectionConfig } from "payload";

export const Newsletters: CollectionConfig = {
	slug: "newsletters",
	labels: {
		singular: "邮件订阅",
		plural: "邮件订阅",
	},
	admin: {
		group: "表单相关",
	},
	fields: [
		{
			name: "email",
			type: "email",
			label: "邮箱",
			required: true,
		},
		{
			name: "status",
			type: "select",
			label: "状态",
			defaultValue: "subscribed",
			options: [
				{
					label: "已订阅",
					value: "subscribed",
				},
				{
					label: "已取消订阅",
					value: "unsubscribed",
				},
			],
		},
	],
};
