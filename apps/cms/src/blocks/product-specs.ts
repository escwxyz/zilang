import type { Block } from "payload";

export const ProductSpecsBlock: Block = {
	slug: "productSpecs",
	interfaceName: "ProductSpecsBlock",
	labels: {
		singular: "产品规格区块",
		plural: "产品规格区块",
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
			name: "specs",
			type: "array",
			label: "规格项",
			labels: {
				singular: "规格项",
				plural: "规格项",
			},
			minRows: 1,
			maxRows: 20,
			fields: [
				{
					name: "name",
					type: "text",
					label: "规格名称",
					required: true,
				},
				{
					name: "value",
					type: "text",
					label: "规格值",
					required: true,
				},
				{
					name: "unit",
					type: "text",
					label: "单位",
				},
				{
					name: "category",
					type: "select",
					label: "分类",
					options: [
						{
							label: "基本参数",
							value: "basic",
						},
						{
							label: "技术参数",
							value: "technical",
						},
						{
							label: "物理参数",
							value: "physical",
						},
						{
							label: "环境参数",
							value: "environmental",
						},
						{
							label: "性能参数",
							value: "performance",
						},
						{
							label: "其他",
							value: "other",
						},
					],
					defaultValue: "basic",
				},
				{
					name: "highlighted",
					type: "checkbox",
					label: "重点规格",
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
					label: "表格布局",
					value: "table",
				},
				{
					label: "卡片布局",
					value: "cards",
				},
				{
					label: "分栏布局",
					value: "columns",
				},
			],
			defaultValue: "table",
		},
		{
			name: "columns",
			type: "select",
			label: "列数",
			options: [
				{
					label: "1 列",
					value: "1",
				},
				{
					label: "2 列",
					value: "2",
				},
				{
					label: "3 列",
					value: "3",
				},
			],
			defaultValue: "2",
			admin: {
				condition: (_, siblingData) => siblingData.layout === "columns",
			},
		},
		{
			name: "groupByCategory",
			type: "checkbox",
			label: "按分类分组",
			defaultValue: true,
		},
		{
			name: "showCategories",
			type: "checkbox",
			label: "显示分类标题",
			defaultValue: true,
			admin: {
				condition: (_, siblingData) => siblingData.groupByCategory,
			},
		},
		{
			name: "downloadableSpecs",
			type: "array",
			label: "可下载规格文件",
			labels: {
				singular: "规格文件",
				plural: "规格文件",
			},
			maxRows: 5,
			fields: [
				{
					name: "title",
					type: "text",
					label: "文件标题",
					required: true,
				},
				{
					name: "file",
					type: "upload",
					label: "文件",
					relationTo: "media",
					required: true,
				},
				{
					name: "fileType",
					type: "select",
					label: "文件类型",
					options: [
						{
							label: "规格书",
							value: "specification",
						},
						{
							label: "用户手册",
							value: "manual",
						},
						{
							label: "技术资料",
							value: "technical",
						},
						{
							label: "证书",
							value: "certificate",
						},
						{
							label: "其他",
							value: "other",
						},
					],
					defaultValue: "specification",
				},
			],
		},
	],
};
