import type { Block } from "payload";
import { validateUrl } from "@/validations/validate-url";

export const CTABlock: Block = {
	slug: "cta",
	interfaceName: "CTABlock",
	labels: {
		singular: "行动号召区块",
		plural: "行动号召区块",
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
			type: "textarea",
			label: "描述",
		},
		{
			name: "backgroundImage",
			type: "upload",
			label: "背景图片",
			relationTo: "media",
		},
		{
			name: "backgroundColor",
			type: "select",
			label: "背景颜色",
			options: [
				{
					label: "白色",
					value: "white",
				},
				{
					label: "灰色",
					value: "gray",
				},
				{
					label: "深色",
					value: "dark",
				},
				{
					label: "主色调",
					value: "primary",
				},
				{
					label: "次要色调",
					value: "secondary",
				},
			],
			defaultValue: "primary",
		},
		{
			name: "buttons",
			type: "array",
			label: "按钮",
			labels: {
				singular: "按钮",
				plural: "按钮",
			},
			minRows: 1,
			maxRows: 3,
			fields: [
				{
					name: "text",
					type: "text",
					label: "按钮文本",
					required: true,
				},
				{
					name: "url",
					type: "text",
					label: "链接地址",
					required: true,
					validate: validateUrl,
				},
				{
					name: "style",
					type: "select",
					label: "按钮样式",
					options: [
						{
							label: "主按钮",
							value: "primary",
						},
						{
							label: "次按钮",
							value: "secondary",
						},
						{
							label: "边框按钮",
							value: "outline",
						},
						{
							label: "文字按钮",
							value: "text",
						},
					],
					defaultValue: "primary",
				},
				{
					name: "size",
					type: "select",
					label: "按钮大小",
					options: [
						{
							label: "小",
							value: "sm",
						},
						{
							label: "中",
							value: "md",
						},
						{
							label: "大",
							value: "lg",
						},
					],
					defaultValue: "md",
				},
				{
					name: "icon",
					type: "text",
					label: "图标",
					admin: {
						description: "图标名称，如：arrow-right、download 等",
					},
				},
				{
					name: "newTab",
					type: "checkbox",
					label: "新窗口打开",
					defaultValue: false,
				},
			],
		},
		{
			name: "layout",
			type: "select",
			label: "布局样式",
			options: [
				{
					label: "居中",
					value: "center",
				},
				{
					label: "左对齐",
					value: "left",
				},
				{
					label: "右对齐",
					value: "right",
				},
				{
					label: "分离布局",
					value: "split",
				},
			],
			defaultValue: "center",
		},
		{
			name: "padding",
			type: "select",
			label: "内边距",
			options: [
				{
					label: "小",
					value: "sm",
				},
				{
					label: "中",
					value: "md",
				},
				{
					label: "大",
					value: "lg",
				},
				{
					label: "特大",
					value: "xl",
				},
			],
			defaultValue: "lg",
		},
	],
};
