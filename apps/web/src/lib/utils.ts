import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUrl = (path: string) => {
	const siteUrl = import.meta.env.PAYLOAD_SITE_URL;
	if (!siteUrl) {
		throw new Error("PAYLOAD_SITE_URL is not set");
	}

	const baseUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

	if (path.startsWith("/")) {
		return baseUrl + path;
	}
	if (path.startsWith("http")) {
		return path;
	}
	return `${baseUrl}/${path}`;
};

export function kebabToPascal(kebab: string): string {
	return kebab
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
}
