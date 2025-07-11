import type { Block } from "payload";

export const TimelineBlock: Block = {
	slug: "timeline",
	interfaceName: "TimelineBlock",
	labels: {
		singular: "时间轴区块",
		plural: "时间轴区块",
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
			type: "text",
			label: "描述",
		},
		{
			name: "events",
			type: "array",
			label: "时间线事件",
			labels: {
				singular: "时间线事件",
				plural: "时间线事件",
			},
			minRows: 1,
			maxRows: 20,
			fields: [
				{
					name: "year",
					type: "number",
					label: "年份",
					required: true,
					min: 1900,
					max: 2030,
				},
				{
					name: "month",
					type: "select",
					label: "月份",
					options: [
						{ label: "1月", value: "1" },
						{ label: "2月", value: "2" },
						{ label: "3月", value: "3" },
						{ label: "4月", value: "4" },
						{ label: "5月", value: "5" },
						{ label: "6月", value: "6" },
						{ label: "7月", value: "7" },
						{ label: "8月", value: "8" },
						{ label: "9月", value: "9" },
						{ label: "10月", value: "10" },
						{ label: "11月", value: "11" },
						{ label: "12月", value: "12" },
					],
				},
				{
					name: "title",
					type: "text",
					label: "事件标题",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					label: "事件描述",
					required: true,
				},
				{
					name: "image",
					type: "upload",
					label: "事件图片",
					relationTo: "media",
				},
				{
					name: "link",
					type: "text",
					label: "相关链接",
				},
				{
					name: "featured",
					type: "checkbox",
					label: "重要事件",
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
					label: "垂直时间轴",
					value: "vertical",
				},
				{
					label: "水平时间轴",
					value: "horizontal",
				},
				{
					label: "交替时间轴",
					value: "alternating",
				},
			],
			defaultValue: "vertical",
		},
		{
			name: "showImages",
			type: "checkbox",
			label: "显示图片",
			defaultValue: true,
		},
		{
			name: "sortOrder",
			type: "select",
			label: "排序方式",
			options: [
				{
					label: "时间正序（最早到最晚）",
					value: "asc",
				},
				{
					label: "时间倒序（最晚到最早）",
					value: "desc",
				},
			],
			defaultValue: "asc",
		},
	],
};
