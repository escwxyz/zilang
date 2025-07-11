import { NumberField } from "@nouance/payload-better-fields-plugin/Number";
import type { ArrayField } from "payload";
import { validateRange } from "@/validations/validate-range";

export const leadTime: ArrayField = {
	name: "leadTime",
	type: "array",
	label: "交货时间",
	labels: {
		singular: "交货时间",
		plural: "交货时间",
	},
	admin: {
		description: "根据数量不同填写不同的交货时间",
		initCollapsed: true,
	},
	validate: validateRange, // TODO: test
	fields: [
		...NumberField(
			{
				name: "min",
				label: "数量下限",
			},
			{
				suffix: " 只",
			}
		),
		...NumberField(
			{
				name: "max",
				label: "数量上限",
			},
			{
				suffix: " 只",
			}
		),

		{
			name: "duration",
			label: "交货时间",
			type: "text",
			required: true,
			admin: {
				description: "填写交货时间，如：10 days",
			},
		},
	],
	defaultValue: [
		{
			min: 1,
			max: 100,
			duration: "10 days",
		},
		{
			min: 101,
			max: 1000,
			duration: "15 days",
		},
		{
			min: 1001,
			max: 10000,
			duration: "45 days",
		},
		{
			min: 10001,
			duration: "To be confirmed",
		},
	],
};
