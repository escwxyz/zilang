import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { zh } from "@payloadcms/translations/languages/zh";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/media";
import { Packaging } from "./collections/packaging";
import { Pages } from "./collections/pages";
import { PumpControllers } from "./collections/pump-controllers";
import { Testmonials } from "./collections/testmonials";
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
	collections: [Users, Media, Pages, PumpControllers, Packaging, Testmonials],
	globals: [Header, Footer, Site, Company],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	sharp,
	plugins: [],
});
