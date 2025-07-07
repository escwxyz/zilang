import type { GlobalConfig } from "payload";
import { isPublic } from "@/access";
import { linkField } from "@/fields/link";

export const Footer: GlobalConfig = {
	slug: "footer",
	label: "页脚导航",
	admin: {
		group: "设置相关",
	},
	access: {
		read: isPublic,
	},
	fields: [
		{
			name: "showContact",
			type: "checkbox",
			label: "显示联系方式",
			defaultValue: true,
			admin: {
				description: "如果勾选，则会在页脚显示联系方式",
			},
		},
		{
			name: "links",
			type: "array",
			label: "导航链接",
			interfaceName: "FooterLinks",
			labels: {
				singular: "导航链接",
				plural: "导航链接",
			},
			minRows: 1,
			maxRows: 3,
			fields: linkField,
		},
	],
};
