import type { Block } from "payload";
import { MediaBlock } from "./media";

export const MediaGridBlock: Block = {
	slug: "media-grid",
	interfaceName: "MediaGridBlock",
	labels: {
		singular: "媒体网格区块",
		plural: "媒体网格区块",
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
			name: "contents",
			type: "blocks",
			label: "内容",
			minRows: 1,
			maxRows: 10,
			labels: {
				singular: "媒体内容",
				plural: "媒体内容",
			},
			blocks: [MediaBlock],
		},
		{
			name: "columns",
			type: "number",
			label: "列数",
			defaultValue: 3,
			min: 2,
			max: 6,
			admin: {
				description: "列数，至少2列，最多6列",
			},
		},
	],
};
