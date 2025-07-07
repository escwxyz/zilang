import type { Block } from "payload";

export const FeaturedProductsBlock: Block = {
	slug: "featuredProducts",
	interfaceName: "FeaturedProductsBlock",
	labels: {
		singular: "推荐产品区块",
		plural: "推荐产品区块",
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
			name: "products",
			label: "推荐产品",
			type: "relationship",
			hasMany: true,
			minRows: 3,
			maxRows: 6,
			relationTo: ["pump-controllers"],
			filterOptions: ({ relationTo }) => {
				if (relationTo === "pump-controllers") {
					return {
						featured: {
							equals: true,
						},
					};
				}
				return false;
			},
		},
	],
};
