import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	labels: {
		singular: "用户",
		plural: "用户",
	},
	admin: {
		useAsTitle: "email",
	},
	auth: true,
	fields: [
		{
			name: "role",
			type: "select",
			label: "角色",
			required: true,
			options: [
				{
					label: "管理员",
					value: "admin",
				},
				{
					label: "编辑",
					value: "editor",
				},
			],
		},
	],
};
