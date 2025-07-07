import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUrl = (path: string) => {
	if (path.startsWith("/")) {
		return import.meta.env.PAYLOAD_SITE_URL + path;
	}
	if (path.startsWith("http")) {
		return path;
	}
	return `${import.meta.env.PAYLOAD_SITE_URL}/${path}`;
};

export function kebabToPascal(kebab: string): string {
	return kebab
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
}
