import type { CollectionSlug, GlobalSlug } from "@repo/types";
import { merge } from "ts-deepmerge";
import type { CacheOptions, D1Cache } from "./cache";
import { getCachedPayloadData, sdk } from "./sdk";

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

export async function getCachedCollectionBySlug<T extends CollectionSlug>(
	cache: D1Cache,
	collectionSlug: T,
	slug: string,
	params: Omit<FindOptionsType, "collection" | "slug">,
	options?: CacheOptions,
) {
	const cacheKey = `${collectionSlug}:${slug}:${JSON.stringify(params)}`;

	const mergedParams = merge(
		{
			where: {
				slug: {
					equals: slug,
				},
			},
			limit: 1,
		},
		params,
	);

	return getCachedPayloadData(
		cache,
		cacheKey,
		() =>
			sdk.find({
				collection: collectionSlug,
				...mergedParams,
			}),
		options,
	);
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

export async function getCachedGlobalBySlug<T extends GlobalSlug>(
	cache: D1Cache,
	globalSlug: T,
	params: Omit<FindGlobalOptionsType, "slug">,
	options?: CacheOptions,
) {
	const cacheKey = `global:${globalSlug}:${JSON.stringify(params)}`;
	return getCachedPayloadData(
		cache,
		cacheKey,
		() =>
			sdk.findGlobal({
				slug: globalSlug,
				...params,
			}),
		options,
	);
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

export async function getCachedCollectionList<T extends CollectionSlug>(
	cache: D1Cache,
	collectionSlug: T,
	params: Omit<FindOptionsType, "collection">,
	options?: CacheOptions,
) {
	const cacheKey = `collection-list:${collectionSlug}:${JSON.stringify(params)}`;
	return getCachedPayloadData(
		cache,
		cacheKey,
		() =>
			sdk.find({
				collection: collectionSlug,
				...params,
			}),
		options,
	);
}
