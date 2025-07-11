import { APIError, type Validate } from "payload";

const getNumericValue = (
	value: { value: number } | number | undefined
): number | undefined => {
	if (typeof value === "undefined") {
		return undefined;
	}
	if (typeof value === "number") {
		return value;
	}
	return value.value;
};

export const validateRange: Validate = (value) => {
	if (!value) return true;

	const minValue = getNumericValue(value.min);
	const maxValue = getNumericValue(value.max);

	if (typeof minValue !== "undefined" && typeof maxValue !== "undefined") {
		if (minValue > maxValue) {
			throw new APIError("最小值不能超过最大值");
		}
	}

	return true;
};
