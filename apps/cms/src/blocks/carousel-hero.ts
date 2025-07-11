import type { Block } from "payload";
import { validateUrl } from "@/validations/validate-url";

export const CarouselHeroBlock: Block = {
	slug: "carouselHero",
	interfaceName: "CarouselHeroBlock",
	labels: {
		singular: "滚动横幅区块",
		plural: "滚动横幅区块",
	},
	fields: [
		{
			name: "carousel",
			type: "array",
			label: "滚动横幅",
			labels: {
				singular: "滚动横幅",
				plural: "滚动横幅",
			},
			minRows: 1,
			maxRows: 3,
			fields: [
				{
					name: "media",
					type: "upload",
					label: "媒体",
					relationTo: "media",
					required: true,
				},
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
					required: true,
				},
				{
					type: "row",
					fields: [
						{
							name: "primaryCTA",
							type: "text",
							label: "主按钮文本",
							required: true,
						},
						{
							name: "primaryCTAUrl",
							type: "text",
							label: "主按钮链接",
							required: true,
							validate: validateUrl,
						},
					],
				},
				{
					type: "row",
					fields: [
						{
							name: "secondaryCTA",
							type: "text",
							label: "次按钮文本",
							required: false,
						},
						{
							name: "secondaryCTAUrl",
							type: "text",
							label: "次按钮链接",
							required: false,
							validate: validateUrl,
						},
					],
				},
			],
		},
		{
			name: "loop",
			type: "checkbox",
			label: "循环播放",
			admin: {
				description: "如果勾选，则滚动横幅会循环播放",
			},
		},
	],
};
