import type { Block } from "payload";

import { iconField } from "@/fields/icon";

export const FeatureBlock: Block = {
	slug: "feature",
	interfaceName: "FeatureBlock",
	labels: {
		singular: "特性区块",
		plural: "特性区块",
	},
	admin: {
		group: "内容相关",
	},
	fields: [
		{
			name: "type",
			label: "类型",
			type: "select",
			options: [
				{
					label: "文本",
					value: "text",
				},
				{
					label: "数字",
					value: "number",
				},
			],
			defaultValue: "text",
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "text",
					label: "标题",
					localized: true,
					// @ts-expect-error - siblingData is not typed
					validate: (value, { siblingData }) => {
						if (siblingData.type === "text" && !value) {
							return " ";
						}
						return true;
					},
					admin: {
						condition: (_, siblingData) => siblingData.type === "text",
						width: "50%",
					},
				},
				{
					name: "number",
					type: "number",
					label: "数字",
					// @ts-expect-error - siblingData is not typed
					validate: (value, { siblingData }) => {
						if (siblingData.type === "number" && !value) {
							return "Number is required when type is number";
						}
						return true;
					},
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
						width: "50%",
					},
				},
				{
					name: "description",
					type: "text",
					label: "描述",
					required: false,
					localized: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		iconField({
			required: true,
		}),
		{
			type: "collapsible",
			label: "配置",
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: "delay",
					type: "number",
					label: "延迟",
					defaultValue: 0,
				},
				{
					name: "withPlus",
					type: "checkbox",
					label: "是否显示加号",
					defaultValue: false,
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
				{
					name: "isPercentage",
					type: "checkbox",
					label: "是否显示百分比",
					defaultValue: false,
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
				{
					name: "startValue",
					type: "number",
					label: "开始值",
					defaultValue: 0,
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
				{
					name: "decimalPlaces",
					type: "number",
					label: "小数位数",
					defaultValue: 0,
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
				{
					name: "direction",
					type: "select",
					label: "方向",
					options: [
						{
							label: "向上",
							value: "up",
						},
						{
							label: "向下",
							value: "down",
						},
					],
					defaultValue: "up",
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
				{
					name: "alignment",
					type: "select",
					label: "对齐方式",
					options: [
						{
							label: "默认",
							value: "default",
						},
						{
							label: "反向",
							value: "reverse",
						},
						{
							label: "居中",
							value: "center",
						},
						{
							label: "居中",
							value: "center",
						},
						{
							label: "两端对齐",
							value: "between",
						},
						{
							label: "反向居中",
							value: "between-reverse",
						},
					],
					defaultValue: "default",
				},
				{
					name: "opacity",
					type: "number",
					label: "透明度",
					defaultValue: 100,
					min: 50,
					max: 100,
				},
				{
					name: "iconBackground",
					type: "checkbox",
					label: "是否显示图标背景",
					defaultValue: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === "number",
					},
				},
			],
		},
	],
};

export const FeaturesBlock: Block = {
	slug: "features",
	interfaceName: "FeaturesBlock",
	labels: {
		singular: "特性区块",
		plural: "特性区块",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "标题",
		},
		{
			name: "description",
			type: "text",
			label: "描述",
		},
		{
			name: "features",
			label: "特性",
			type: "blocks",
			labels: {
				singular: "特性",
				plural: "特性",
			},
			admin: {
				description: "特性区块，至少2个，最多6个",
			},
			minRows: 2,
			maxRows: 6,
			blocks: [FeatureBlock],
		},
		{
			name: "columns",
			label: "列数",
			type: "select",
			options: [
				{
					label: "2 列",
					value: "2",
				},
				{
					label: "3 列",
					value: "3",
				},
				{
					label: "1 列",
					value: "1",
				},
			],
			defaultValue: "2",
		},
	],
};
