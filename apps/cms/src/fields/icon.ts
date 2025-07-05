import iconNodes from "lucide-static/icon-nodes.json";
import type { SelectField } from "payload";

export type IconOption = {
	value: string;
	label: string;
};

export type IconField = (overrides?: Partial<SelectField>) => SelectField;

const iconField: IconField = (overrides = {}) => {
	const lucideIconOptions = Object.keys(iconNodes).map((slug) => {
		const label = slug
			.split("-")
			.map((segment) => {
				if (/^\d+$/.test(segment)) return segment;

				return segment
					.replace(/^[a-z]/, (c) => c.toUpperCase())
					.replace(/(\d)([a-z])/g, (_, d, l) => d + l.toUpperCase());
			})
			.join(" ");

		return {
			value: slug,
			label,
		};
	});

	const baseField = {
		name: "icon",
		label: "图标",
		type: "select",
		interfaceName: "IconName",
		required: false,
		hasMany: false,
		options: lucideIconOptions,
		admin: {
			...overrides.admin,
			components: {
				...overrides.admin?.components,
				Field: {
					path: "@/components/icon#IconComponent",
				},
			},
		},
		...overrides,
	} as SelectField;

	return baseField;
};

export { iconField };
