import type { TextFieldValidation } from "payload";

export const validatePhone: TextFieldValidation = (value) => {
	if (!value) return true;
	const phoneRegex =
		/^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
	if (!phoneRegex.test(value)) {
		return "请输入有效的电话号码";
	}
	return true;
};
