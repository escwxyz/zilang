import type { Block } from "payload";

export const ContactFormBlock: Block = {
	slug: "contactForm",
	interfaceName: "ContactFormBlock",
	labels: {
		singular: "联系表单区块",
		plural: "联系表单区块",
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
			name: "fields",
			type: "array",
			label: "表单字段",
			labels: {
				singular: "表单字段",
				plural: "表单字段",
			},
			minRows: 1,
			maxRows: 10,
			fields: [
				{
					name: "fieldType",
					type: "select",
					label: "字段类型",
					options: [
						{
							label: "文本输入",
							value: "text",
						},
						{
							label: "邮箱",
							value: "email",
						},
						{
							label: "电话",
							value: "tel",
						},
						{
							label: "多行文本",
							value: "textarea",
						},
						{
							label: "下拉选择",
							value: "select",
						},
						{
							label: "单选框",
							value: "radio",
						},
						{
							label: "复选框",
							value: "checkbox",
						},
					],
					defaultValue: "text",
					required: true,
				},
				{
					name: "label",
					type: "text",
					label: "字段标签",
					required: true,
				},
				{
					name: "placeholder",
					type: "text",
					label: "占位符",
				},
				{
					name: "required",
					type: "checkbox",
					label: "必填项",
					defaultValue: false,
				},
				{
					name: "options",
					type: "array",
					label: "选项",
					labels: {
						singular: "选项",
						plural: "选项",
					},
					minRows: 1,
					maxRows: 10,
					admin: {
						condition: (_, siblingData) =>
							siblingData.fieldType === "select" ||
							siblingData.fieldType === "radio" ||
							siblingData.fieldType === "checkbox",
					},
					fields: [
						{
							name: "label",
							type: "text",
							label: "选项标签",
							required: true,
						},
						{
							name: "value",
							type: "text",
							label: "选项值",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "submitButtonText",
			type: "text",
			label: "提交按钮文本",
			defaultValue: "Submit",
			required: true,
		},
		{
			name: "successMessage",
			type: "text",
			label: "成功提示信息",
			defaultValue: "Thank you for your message, we will contact you soon!",
		},
		{
			name: "errorMessage",
			type: "text",
			label: "错误提示信息",
			defaultValue: "Submission failed, please try again or contact us.",
		},
	],
};
