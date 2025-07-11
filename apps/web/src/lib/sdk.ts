import { PayloadSDK } from "@repo/sdk";
import type { Config } from "@repo/types";

const PAYLOAD_API_URL = `${import.meta.env.PAYLOAD_SITE_URL}/api`;

export const sdk = new PayloadSDK<Config>({
	baseURL: PAYLOAD_API_URL,
});
