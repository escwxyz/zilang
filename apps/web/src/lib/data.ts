import type { CollectionSlug, GlobalSlug } from "@repo/types";
import { merge } from "ts-deepmerge";
import { sdk } from "./sdk";

type FindOptionsType = Parameters<typeof sdk.find>[0];
type FindGlobalOptionsType = Parameters<typeof sdk.findGlobal>[0];

export async function getCollectionBySlug<T extends CollectionSlug>(
	collectionSlug: T,
	slug: string,
	params?: Omit<FindOptionsType, "collection" | "slug">,
) {
	const mergedParams = merge(
		{
			where: {
				slug: {
					equals: slug,
				},
			},
			limit: 1,
		},
		params ?? {},
	);

	return sdk.find({
		collection: collectionSlug,
		...mergedParams,
	});
}

export async function getGlobalBySlug<T extends GlobalSlug>(
	globalSlug: T,
	params?: Omit<FindGlobalOptionsType, "slug">,
) {
	return sdk.findGlobal({
		slug: globalSlug,
		...params,
	});
}

export async function getCollectionList<T extends CollectionSlug>(
	collectionSlug: T,
	params?: Omit<FindOptionsType, "collection">,
) {
	return sdk.find({
		collection: collectionSlug,
		...params,
	});
}
