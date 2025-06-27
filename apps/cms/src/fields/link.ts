import { APIError, type Field, type FieldHook } from "payload";

const validateUrl: FieldHook = ({ value, siblingData }) => {
	if (siblingData?.type === "internal") {
		if (typeof value !== "string" || !value.startsWith("/")) {
			throw new APIError("内部链接必须以 / 开头");
		}
	}
	if (siblingData?.type === "external") {
		if (
			typeof value !== "string" ||
			!(value.startsWith("http://") || value.startsWith("https://"))
		) {
			throw new APIError("外部链接必须以 http:// 或 https:// 开头");
		}
	}
};

const validateLabel: FieldHook = ({ value, siblingData }) => {
	if (siblingData?.type !== "page" && (!value || value === "")) {
		throw new APIError("链接文本为必填项");
	}
};

export const linkField: Field[] = [
	{
		name: "type",
		type: "select",
		label: "链接类型",
		options: [
			{
				label: "内部链接",
				value: "internal",
			},
			{
				label: "外部链接",
				value: "external",
			},
			{
				label: "页面",
				value: "page",
			},
		],
		defaultValue: "internal",
		required: true,
	},
	{
		name: "page",
		type: "relationship",
		label: "页面",
		relationTo: "pages",
		admin: {
			condition: (_, siblingData) => siblingData?.type === "page",
		},
	},
	{
		name: "url",
		type: "text",
		label: "链接地址",
		admin: {
			condition: (_, siblingData) => siblingData?.type !== "page",
		},
		hooks: {
			beforeChange: [validateUrl],
		},
	},
	{
		name: "label",
		type: "text",
		label: "链接文本",
		admin: {
			condition: (_, siblingData) => siblingData?.type !== "page",
		},
		hooks: {
			beforeChange: [validateLabel],
		},
	},
];
