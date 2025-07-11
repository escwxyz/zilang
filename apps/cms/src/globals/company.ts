import { TelephoneField } from "@nouance/payload-better-fields-plugin/Telephone";
import type { GlobalConfig } from "payload";
import { isPublic } from "@/access";

export const Company: GlobalConfig = {
	slug: "company",
	label: "公司信息",
	admin: {
		group: "设置相关",
	},
	access: {
		read: isPublic,
	},
	fields: [
		{
			type: "group",
			label: "基本信息",
			fields: [
				{
					name: "name",
					type: "text",
					label: "公司名称",
					required: true,
					defaultValue: "Taizhou Zilang Electrical Technology Co., Ltd.",
				},
				{
					name: "logo",
					type: "upload",
					label: "公司 Logo",
					relationTo: "media",
					required: false,
				},
				{
					name: "slogan",
					type: "textarea",
					label: "公司简介或标语",
					required: false,
				},
			],
		},
		{
			name: "address",
			type: "group",
			label: "公司地址",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "street",
							type: "text",
							label: "街道",
							required: true,
							admin: {
								width: "100%",
							},
							defaultValue: "Huxin Industrial Zone, Chumen Town",
						},
					],
				},

				{
					type: "row",
					fields: [
						{
							name: "zip",
							type: "text",
							label: "邮编",
							required: true,
							defaultValue: "317606",
						},
						{
							name: "city",
							type: "text",
							label: "城市",
							required: true,
							defaultValue: "Yuhuan",
						},
					],
				},
				{
					name: "country",
					type: "text",
					label: "国家",
					required: true,
					defaultValue: "China",
				},
			],
		},
		{
			name: "contact",
			type: "group",
			label: "联系方式",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "email",
							type: "email",
							label: "邮件地址",
							required: true,
							admin: {
								width: "35%",
							},
							defaultValue: process.env.RESEND_EMAIL_ADDRESS || "",
						},
					],
				},
				...TelephoneField(
					{
						name: "telephone",
						label: "固定电话",
						required: true,
						admin: {
							placeholder: "+86 12345678",
							width: "35%",
						},
					},
					{
						defaultCountry: "CN",
					},
				),
				...TelephoneField(
					{
						name: "whatsapp",
						label: "WhatsApp 号码",
						required: true,
						admin: {
							placeholder: "+86 13812345678",
							width: "35%",
						},
					},
					{
						defaultCountry: "CN",
					},
				),
			],
		},
	],
};
