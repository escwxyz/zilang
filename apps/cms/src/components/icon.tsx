"use client";

import { FieldLabel, ReactSelect, useField } from "@payloadcms/ui";
import type { Option } from "@payloadcms/ui/elements/ReactSelect";
import Image from "next/image";
import type { SelectFieldClientComponent } from "payload";
import React, { type CSSProperties, useCallback, useMemo } from "react";
import { areEqual, FixedSizeList as List } from "react-window";

const ICON_URL = "https://cdn.jsdelivr.net/npm/lucide-static@0.508.0/icons/";

export const IconPreview: React.FC<{ name: string }> = React.memo(
	({ name }) => {
		const src = `${ICON_URL}${name}.svg`;

		return (
			<Image
				alt={name}
				className="mr-2 h-4 w-4 flex-shrink-0 dark:invert"
				height={20}
				loading="lazy"
				onError={(e) => {
					e.currentTarget.style.display = "none";
				}}
				src={src}
				unoptimized
				width={20}
			/>
		);
	}
);

IconPreview.displayName = "IconPreview";

interface CustomOptionProps {
	data: { value: string; label: string };
	innerProps: React.HTMLAttributes<HTMLDivElement>;
	isSelected: boolean;
}

const CustomOption = ({ data, innerProps, isSelected }: CustomOptionProps) => (
	<div
		{...innerProps}
		className={`flex cursor-pointer items-center p-2 hover:bg-accent-500 ${isSelected ? "bg-accent-500" : ""}`}
	>
		<IconPreview name={data.value} />
		{data.label}
	</div>
);

const SingleValue = ({ data }: { data: { value: string; label: string } }) => (
	<div className="absolute flex items-center">
		<IconPreview name={data.value} />
		{data.label}
	</div>
);

const ITEM_HEIGHT = 36;

type RowProps = {
	index: number;
	style: React.CSSProperties;
	data: React.ReactNode[];
};

const Row = React.memo(({ index, style, data }: RowProps) => {
	const child = data[index];
	if (!child) {
		return null;
	}

	return (
		<div key={(child as React.ReactElement).key} style={style}>
			{child}
		</div>
	);
}, areEqual);

Row.displayName = "VirtualizedRow";

const VirtualMenuList = ({
	children,
	maxHeight,
}: {
	children: React.ReactNode;
	maxHeight: number;
}) => {
	const items = React.Children.toArray(children);
	const itemCount = items.length;
	const listHeight = Math.min(maxHeight, itemCount * ITEM_HEIGHT);

	return (
		<List
			height={listHeight}
			itemCount={itemCount}
			itemData={items}
			itemSize={ITEM_HEIGHT}
			width="100%"
		>
			{Row}
		</List>
	);
};

const reactSelectComponents = {
	Option: CustomOption,
	SingleValue,
	MenuList: VirtualMenuList,
};

const IconComponent: SelectFieldClientComponent = ({ field, path }) => {
	const { label, admin, hasMany = false } = field;
	const { value, setValue } = useField({ path });
	const placeholder =
		typeof admin?.placeholder === "function"
			? admin?.placeholder(field)
			: admin?.placeholder || "搜索图标";
	const isClearable = admin?.isClearable === false ? undefined : true;
	const className = admin?.className;

	const options = useMemo(() => field.options as Option[], [field.options]);

	const currentOption = useMemo(() => {
		return options.find((option) => option.value === value) as
			| Option
			| undefined;
	}, [options, value]);

	const handleChange = useCallback(
		(selected: Option | null) => {
			setValue(selected ? selected.value : null);
		},
		[setValue]
	);

	return (
		<div
			className="field-type select w-full"
			style={
				{ "--field-width": field?.admin?.width || undefined } as CSSProperties
			}
		>
			<div className="label-wrapper">
				<FieldLabel htmlFor={`field-${path}`} label={label} />
			</div>

			<ReactSelect
				className={className}
				components={reactSelectComponents}
				isClearable={isClearable}
				isCreatable={false}
				isMulti={hasMany}
				onChange={(opt) => handleChange(opt as Option | null)}
				options={options}
				placeholder={placeholder}
				value={currentOption}
			/>
		</div>
	);
};

export { IconComponent };
