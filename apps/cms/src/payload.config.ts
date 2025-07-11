import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { zh } from "@payloadcms/translations/languages/zh";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Faqs } from "./collections/faqs";
import { Inquiries } from "./collections/inquiries";
import { Media } from "./collections/media";
import { Newsletters } from "./collections/newsletters";
import { Packaging } from "./collections/packaging";
import { Pages } from "./collections/pages";
import { PumpControllers } from "./collections/pump-controllers";
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
		meta: {
			robots: "noindex, nofollow",
			titleSuffix: " - 紫郎电器",
			title: "紫郎电器",
			description: "紫郎电器网站管理后台",
			icons: [
				{
					rel: "icon",
					type: "image/x-icon",
					url: "/favicon.svg",
				},
			],
		},
		components: {
			graphics: {
				Logo: {
					path: "@/components/logo#Logo",
				},
				Icon: {
					path: "@/components/logo#MenuIcon",
				},
			},
		},
	},
	i18n: {
		supportedLanguages: { zh },
		fallbackLanguage: "zh",
	},
	collections: [
		Users,
		Media,
		Pages,
		PumpControllers,
		Packaging,
		Faqs,
		Inquiries,
		Newsletters,
	],
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
		defaultFromAddress: process.env.RESEND_FROM_ADDRESS || "",
		defaultFromName: process.env.RESEND_FROM_NAME || "",
		apiKey: process.env.RESEND_API_KEY || "",
	}),
	// Version issue
	// @ts-ignore
	sharp,
	plugins: [],
	endpoints: [
		{
			path: "/health",
			method: "get",
			handler: () => {
				return new Response("OK", { status: 200 });
			},
		},
	],
	telemetry: false,
	cors: process.env.NODE_ENV === "production" ? undefined : "*",
	onInit: async (payload) => {
		const email =
			process.env.NODE_ENV === "production"
				? process.env.ADMIN_EMAIL
				: "admin@admin.com";
		const password =
			process.env.NODE_ENV === "production"
				? process.env.ADMIN_PASSWORD
				: "admin";

		if (process.env.NODE_ENV === "production") {
			if (!email || !password) {
				payload.logger.error(
					"ADMIN_EMAIL and ADMIN_PASSWORD are required in production",
				);
				return;
			}
		}

		try {
			const existing = await payload.find({
				collection: "users",
				where: { email: { equals: email } },
			});

			if (email && password) {
				if (!existing.docs.length) {
					await payload.create({
						collection: "users",
						data: {
							email,
							password,
							role: "admin",
						},
					});
					payload.logger.info(`Admin user ${email} created`);
				} else {
					payload.logger.info(`Admin user ${email} already exists`);
				}
			}
		} catch (error) {
			payload.logger.error("Error creating admin user", error);
		}
	},
});
