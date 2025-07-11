import { NumberField } from "@nouance/payload-better-fields-plugin/Number";
import type { GroupField } from "payload";
import { validateRange } from "@/validations/validate-range";

type RangeFieldOptions = {
	name: string;
	label: string;
	unit?: string;
	min?: number;
	defaultMin?: number;
	defaultMax?: number;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	required?: boolean;
};

export function RangeField({
	name,
	label,
	unit = "",
	min = 0,
	decimalScale,
	fixedDecimalScale,
	defaultMax,
	defaultMin,
	required,
}: RangeFieldOptions): GroupField {
	return {
		name,
		type: "group",
		label,
		validate: validateRange,
		required,
		fields: [
			{
				type: "row",
				fields: [
					...NumberField(
						{
							name: "min",
							label: "最小值",
							min,
							defaultValue: defaultMin,
							required,
						},
						{
							suffix: unit ? ` ${unit}` : undefined,
							decimalScale,
							fixedDecimalScale,
						}
					),
					...NumberField(
						{
							name: "max",
							label: "最大值",
							min,
							defaultValue: defaultMax,
							required,
						},
						{
							suffix: unit ? ` ${unit}` : undefined,
							decimalScale,
							fixedDecimalScale,
						}
					),
				],
			},
		],
	};
}
