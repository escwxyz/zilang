import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { zh } from "@payloadcms/translations/languages/zh";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/media";
import { Packaging } from "./collections/packaging";
import { Pages } from "./collections/pages";
import { PumpControllers } from "./collections/pump-controllers";
import { Testimonials } from "./collections/testimonials";
import { Users } from "./collections/users";
import { Company } from "./globals/company";
import { Footer } from "./globals/footer";
import { Header } from "./globals/header";
import { Site } from "./globals/site";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	i18n: {
		supportedLanguages: { zh },
		fallbackLanguage: "zh",
	},
	collections: [Users, Media, Pages, PumpControllers, Packaging, Testimonials],
	globals: [Header, Footer, Site, Company],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "../../../packages/types/src/payload.ts"),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	email: resendAdapter({
		defaultFromAddress: "dev@payloadcms.com",
		defaultFromName: "Payload CMS",
		apiKey: process.env.RESEND_API_KEY || "",
	}),
	// Version issue
	// @ts-ignore
	sharp,
	plugins: [],
	endpoints: [
		// health check for Railway
		{
			path: "/health",
			method: "get",
			handler: async (req) => {
				return new Response("OK", { status: 200 });
			},
		},
	],
	telemetry: false,
});
