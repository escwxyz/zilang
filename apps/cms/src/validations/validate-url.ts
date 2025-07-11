import { APIError, type TextFieldValidation } from "payload";

export const validateUrl: TextFieldValidation = (value) => {
	if (!value) return true;

	try {
		new URL(value, value.startsWith("/") ? process.env.WEBSITE_URL : undefined);
		return true;
	} catch {
		throw new APIError("请输入有效的URL");
	}
};
