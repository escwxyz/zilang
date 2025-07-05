import type { CollectionConfig } from "payload";
import { isAdmin, isAuthenticated, isPublic } from "@/access";

export const Inquiries: CollectionConfig = {
	slug: "inquiries",
	labels: {
		singular: "客户询盘",
		plural: "客户询盘",
	},
	admin: {
		group: "表单相关",
		useAsTitle: "email",
	},
	access: {
		create: isPublic,
		read: isAuthenticated,
		update: isAdmin,
		delete: isAdmin,
	},
	fields: [
		{
			name: "status",
			type: "select",
			label: "状态",
			required: true,
			options: [
				{
					label: "待处理",
					value: "pending",
				},
				{
					label: "已处理",
					value: "processed",
				},
			],
			defaultValue: "pending",
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "notes",
			type: "textarea",
			label: "备注",
			admin: {
				position: "sidebar",
				description: "管理员可以在这里添加备注",
			},
		},
		{
			name: "name",
			type: "text",
			label: "客户姓名",
			required: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: "email",
			type: "email",
			label: "客户邮箱",
			required: true,
			admin: {
				readOnly: true,
			},
		},
		{
			name: "phone",
			type: "text",
			label: "客户电话",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "company",
			type: "text",
			label: "客户公司",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "product",
			type: "relationship",
			label: "询盘产品",
			relationTo: "pump-controllers",
			admin: {
				readOnly: true,
			},
		},
		{
			name: "message",
			type: "textarea",
			label: "客户留言",
			required: true,
			admin: {
				readOnly: true,
			},
		},
	],
};
