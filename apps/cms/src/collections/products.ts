import { NumberField } from "@nouance/payload-better-fields-plugin/Number";
import { SlugField } from "@nouance/payload-better-fields-plugin/Slug";
import type { CollectionConfig } from "payload";
import { leadTime } from "@/fields/leadtime";
import { RangeField } from "@/fields/range";

export const Products: CollectionConfig = {
	slug: "products",
	labels: {
		singular: "产品",
		plural: "产品",
	},
	admin: {
		group: "产品相关",
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "产品名称",
			required: true,
		},
		...SlugField(),
		{
			name: "category",
			type: "select",
			label: "产品分类",
			required: true,
			options: [
				{
					label: "普通型",
					value: "standard",
				},
				{
					label: "智能模式",
					value: "smart",
				},
				{
					label: "全自动",
					value: "auto",
				},
			],
			defaultValue: "smart",
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "excerpt",
			type: "textarea",
			label: "产品概要",
			required: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "基本信息",
					description: "",
					fields: [
						{
							name: "modelName",
							type: "text",
							label: "型号代码",
							required: true,
						},
						{
							name: "gallery",
							type: "upload",
							label: "产品媒体文件",
							relationTo: "media",
							minRows: 1,
							maxRows: 10,
							hasMany: true,
						},
						{
							name: "description",
							type: "richText",
							label: "产品描述",
							required: true,
						},
					],
				},
				{
					label: "产品参数",
					fields: [
						RangeField({
							name: "voltage",
							label: "使用电压范围",
							unit: "V",
						}),
						{
							type: "row",
							fields: [
								{
									name: "contactLoad",
									type: "text",
									label: "触点负载 [A]",
									required: true,
									defaultValue: "30A/40A",
								},
								...NumberField(
									{
										name: "relayLife",
										label: "继电器机械寿命",
										required: true,
										min: 0,
										defaultValue: 1,
									},
									{
										suffix: "x10^7 次",
									},
								),
							],
						},
						{
							type: "row",
							fields: [
								...NumberField(
									{
										name: "maxCurrent",
										label: "最大电流",
										required: true,
										min: 0,
										defaultValue: 16,
									},
									{
										suffix: " A",
									},
								),
								...NumberField(
									{
										name: "maxPower",
										label: "最大功率",
										required: true,
										min: 0,
										defaultValue: 16.0,
									},
									{
										suffix: " kW",
										decimalScale: 1,
										fixedDecimalScale: true,
									},
								),
							],
						},
						{
							type: "collapsible",
							label: "压力相关",
							admin: {
								initCollapsed: true,
							},
							fields: [
								{
									type: "row",
									fields: [
										...NumberField(
											{
												name: "maxPressure",
												label: "最大使用压力",
												required: true,
												min: 0,
												defaultValue: 10,
											},
											{
												suffix: " bar",
											},
										),
										...NumberField(
											{
												name: "extremePressure",
												label: "极限爆破压力",
												required: true,
												min: 0,
												defaultValue: 30,
											},
											{
												suffix: " bar",
											},
										),
									],
								},
								RangeField({
									name: "startingPressure",
									label: "启动压强",
									unit: "bar",
									decimalScale: 1,
									fixedDecimalScale: true,
								}),
							],
						},

						RangeField({
							name: "frequency",
							label: "频率范围",
							unit: "HZ",
							defaultMin: 50,
							defaultMax: 60,
						}),

						{
							type: "row",
							fields: [
								{
									name: "protectionGrade",
									type: "text",
									label: "防护等级",
									required: true,
									defaultValue: "IP65",
								},
								{
									name: "threadInterface",
									type: "text",
									label: "接口",
									required: true,
									defaultValue: `G 1"`,
								},
							],
						},
						{
							type: "row",
							fields: [
								{
									type: "text",
									name: "switchChar",
									label: "压力开关机械特性",
								},

								...NumberField(
									{
										name: "temperature",
										label: "最高温度",
										required: true,
										min: 0,
										defaultValue: 55,
									},
									{
										suffix: " °C",
									},
								),
							],
						},
						{
							type: "select",
							name: "flowSwitch",
							label: "流量开关特性",
							options: [
								{
									label: "干簧管",
									value: "reed",
								},
								{
									label: "无",
									value: "none",
								},
							],
						},
						{
							type: "select",
							name: "startingMethod",
							label: "启动压力设置",
							options: [
								{
									label: "自适应",
									value: "auto",
								},
								{
									label: "手动",
									value: "manual",
								},
								{
									label: "启动压力调节",
									value: "pressure",
								},
								{
									label: "启动温度调节",
									value: "temperature",
								},
							],
						},
						{
							type: "text",
							name: "buffer",
							label: "机械缓冲",
						},
						...NumberField(
							{
								name: "verticalHeight",
								label: "垂直使用高度",
								required: true,
								min: 0,
								defaultValue: 70,
							},
							{
								suffix: " m",
							},
						),
					],
				},
				{
					label: "其他",
					fields: [
						{
							name: "packaging",
							type: "relationship",
							relationTo: "packaging",
							required: true,
							label: "包装规格",
						},
						{
							name: "relatedProducts",
							type: "relationship",
							relationTo: "products",
							label: "相关产品",
							hasMany: true,
							maxRows: 6,
						},
						leadTime,
					],
				},
			],
		},
	],
};
