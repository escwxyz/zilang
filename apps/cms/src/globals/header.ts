import type { GlobalConfig } from "payload";
import { linkField } from "@/fields/link";

export const Header: GlobalConfig = {
	slug: "header",
	label: "顶部导航",
	admin: {
		group: "设置相关",
	},
	fields: [
		{
			name: "logo",
			type: "upload",
			label: "Logo",
			relationTo: "media",
			required: true,
		},
		{
			name: "showName",
			type: "checkbox",
			label: "显示品牌名称",
			admin: {
				description: "如果勾选，则会在顶部导航栏显示品牌名称",
			},
		},
		{
			name: "name",
			type: "text",
			label: "品牌名称",
			admin: {
				condition: (_, siblingData) => siblingData?.showName,
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
			maxRows: 6,
			fields: linkField,
		},
	],
};
