import type { GlobalConfig } from "payload";
import { linkField } from "@/fields/link";

export const Footer: GlobalConfig = {
	slug: "footer",
	label: "页脚导航",
	admin: {
		group: "设置相关",
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
			name: "showAddress",
			type: "checkbox",
			label: "显示地址",
			defaultValue: true,
			admin: {
				description: "如果勾选，则会在页脚显示地址",
			},
		},
		{
			name: "links",
			type: "array",
			label: "导航链接",
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
