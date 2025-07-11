import type { Block } from "payload";

export const TeamBlock: Block = {
	slug: "team",
	interfaceName: "TeamBlock",
	labels: {
		singular: "团队成员区块",
		plural: "团队成员区块",
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
			name: "members",
			type: "array",
			label: "团队成员",
			labels: {
				singular: "团队成员",
				plural: "团队成员",
			},
			minRows: 1,
			maxRows: 12,
			fields: [
				{
					name: "name",
					type: "text",
					label: "姓名",
					required: true,
				},
				{
					name: "position",
					type: "text",
					label: "职位",
					required: true,
				},
				{
					name: "bio",
					type: "textarea",
					label: "简介",
				},
				{
					name: "photo",
					type: "upload",
					label: "头像",
					relationTo: "media",
					required: true,
				},
				{
					name: "social",
					type: "array",
					label: "社交链接",
					labels: {
						singular: "社交链接",
						plural: "社交链接",
					},
					maxRows: 5,
					fields: [
						{
							name: "platform",
							type: "select",
							label: "平台",
							options: [
								{
									label: "LinkedIn",
									value: "linkedin",
								},
								{
									label: "Twitter",
									value: "twitter",
								},
								{
									label: "GitHub",
									value: "github",
								},
								{
									label: "微信",
									value: "wechat",
								},
								{
									label: "邮箱",
									value: "email",
								},
							],
							required: true,
						},
						{
							name: "url",
							type: "text",
							label: "链接",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "layout",
			type: "select",
			label: "布局样式",
			options: [
				{
					label: "网格布局",
					value: "grid",
				},
				{
					label: "卡片布局",
					value: "cards",
				},
				{
					label: "列表布局",
					value: "list",
				},
			],
			defaultValue: "grid",
		},
		{
			name: "columns",
			type: "select",
			label: "列数",
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
					label: "4 列",
					value: "4",
				},
			],
			defaultValue: "3",
			admin: {
				condition: (_, siblingData) => siblingData.layout === "grid",
			},
		},
	],
};
