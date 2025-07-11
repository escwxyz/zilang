import type {
	ApplyDisableErrors,
	PaginatedDocs,
	SelectType,
	TypeWithVersion,
} from "payload";

import type { CountOptions } from "./collections/count";
import { count } from "./collections/count";
import type { CreateOptions } from "./collections/create";
import { create } from "./collections/create";
import type {
	DeleteByIDOptions,
	DeleteManyOptions,
	DeleteOptions,
} from "./collections/delete";
import { deleteOperation } from "./collections/delete";
import type { FindOptions } from "./collections/find";
import { find } from "./collections/find";
import type { FindByIDOptions } from "./collections/find-by-id";
import { findByID } from "./collections/find-by-id";
import type { FindVersionByIDOptions } from "./collections/find-version-by-id";
import { findVersionByID } from "./collections/find-version-by-id";
import type { FindVersionsOptions } from "./collections/find-versions";
import { findVersions } from "./collections/find-versions";
import type { RestoreVersionByIDOptions } from "./collections/restore-version";
import { restoreVersion } from "./collections/restore-version";
import {
	type UpdateByIDOptions,
	type UpdateManyOptions,
	type UpdateOptions,
	update,
} from "./collections/update";
import { type FindGlobalOptions, findGlobal } from "./globals/find-one";
import type { FindGlobalVersionByIDOptions } from "./globals/find-version-by-id";
import { findGlobalVersionByID } from "./globals/find-version-by-id";
import type { FindGlobalVersionsOptions } from "./globals/find-versions";
import { findGlobalVersions } from "./globals/find-versions";
import type { RestoreGlobalVersionByIDOptions } from "./globals/restore-version";
import { restoreGlobalVersion } from "./globals/restore-version";
import type { UpdateGlobalOptions } from "./globals/update";
import { updateGlobal } from "./globals/update";
import type {
	BulkOperationResult,
	CollectionSlug,
	DataFromCollectionSlug,
	DataFromGlobalSlug,
	GlobalSlug,
	PayloadGeneratedTypes,
	SelectFromCollectionSlug,
	SelectFromGlobalSlug,
	TransformCollectionWithSelect,
	TransformGlobalWithSelect,
} from "./types";
import type { OperationArgs } from "./utils/build-search-param";
import { buildSearchParams } from "./utils/build-search-param";

type Args = {
	/** Base passed `RequestInit` to `fetch`. For base headers / credentials include etc. */
	baseInit?: RequestInit;

	/**
	 * Base API URL for requests.
	 * @example 'https://example.com/api'
	 */
	baseURL: string;

	/**
	 * This option allows you to pass a custom `fetch` implementation.
	 * The function always receives `path` as the first parameter and `RequestInit` as the second.
	 * @example For testing without needing an HTTP server:
	 * ```typescript
	 * import type { GeneratedTypes, SanitizedConfig } from 'payload';
	 * import config from '@payload-config';
	 * import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes';
	 * import { PayloadSDK } from '@payloadcms/sdk';
	 *
	 * export type TypedPayloadSDK = PayloadSDK<GeneratedTypes>;
	 *
	 * const api = {
	 *   GET: REST_GET(config),
	 *   POST: REST_POST(config),
	 *   PATCH: REST_PATCH(config),
	 *   DELETE: REST_DELETE(config),
	 *   PUT: REST_PUT(config),
	 * };
	 *
	 * const awaitedConfig = await config;
	 *
	 * export const sdk = new PayloadSDK<GeneratedTypes>({
	 *   baseURL: '',
	 *   fetch: (path: string, init: RequestInit) => {
	 *     const [slugs, search] = path.slice(1).split('?');
	 *     const url = `${awaitedConfig.serverURL || 'http://localhost:3000'}${awaitedConfig.routes.api}/${slugs}${search ? `?${search}` : ''}`;
	 *
	 *     if (init.body instanceof FormData) {
	 *       const file = init.body.get('file') as Blob;
	 *       if (file && init.headers instanceof Headers) {
	 *         init.headers.set('Content-Length', file.size.toString());
	 *       }
	 *     }
	 *
	 *     const request = new Request(url, init);
	 *
	 *     const params = {
	 *       params: Promise.resolve({
	 *         slug: slugs.split('/'),
	 *       }),
	 *     };
	 *
	 *     return api[init.method.toUpperCase()](request, params);
	 *   },
	 * });
	 * ```
	 */
	fetch?: typeof fetch;
};

export class PayloadSDK<
	T extends PayloadGeneratedTypes = PayloadGeneratedTypes,
> {
	baseInit: RequestInit;

	baseURL: string;

	fetch: typeof fetch;
	constructor(args: Args) {
		this.baseURL = args.baseURL;
		this.fetch = args.fetch ?? globalThis.fetch;
		this.baseInit = args.baseInit ?? {};
	}

	/**
	 * @description Performs count operation
	 * @param options
	 * @returns count of documents satisfying query
	 */
	count<TSlug extends CollectionSlug<T>>(
		options: CountOptions<T, TSlug>,
		init?: RequestInit
	): Promise<{ totalDocs: number }> {
		return count(this, options, init);
	}

	/**
	 * @description Performs create operation
	 * @param options
	 * @returns created document
	 */
	create<TSlug extends CollectionSlug<T>, TSelect extends SelectType>(
		options: CreateOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<TransformCollectionWithSelect<T, TSlug, TSelect>> {
		return create(this, options, init);
	}

	delete<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: DeleteManyOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<BulkOperationResult<T, TSlug, TSelect>>;
	delete<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: DeleteByIDOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<TransformCollectionWithSelect<T, TSlug, TSelect>>;

	/**
	 * @description Update one or more documents
	 * @param options
	 * @returns Updated document(s)
	 */
	delete<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: DeleteOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<
		| BulkOperationResult<T, TSlug, TSelect>
		| TransformCollectionWithSelect<T, TSlug, TSelect>
	> {
		return deleteOperation(this, options, init);
	}

	/**
	 * @description Find documents with criteria
	 * @param options
	 * @returns documents satisfying query
	 */
	find<TSlug extends CollectionSlug<T>, TSelect extends SelectType>(
		options: FindOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<PaginatedDocs<TransformCollectionWithSelect<T, TSlug, TSelect>>> {
		return find(this, options, init);
	}

	/**
	 * @description Find document by ID
	 * @param options
	 * @returns document with specified ID
	 */
	findByID<
		TSlug extends CollectionSlug<T>,
		TDisableErrors extends boolean,
		TSelect extends SelectType,
	>(
		options: FindByIDOptions<T, TSlug, TDisableErrors, TSelect>,
		init?: RequestInit
	): Promise<
		ApplyDisableErrors<
			TransformCollectionWithSelect<T, TSlug, TSelect>,
			TDisableErrors
		>
	> {
		return findByID(this, options, init);
	}

	findGlobal<
		TSlug extends GlobalSlug<T>,
		TSelect extends SelectFromGlobalSlug<T, TSlug>,
	>(
		options: FindGlobalOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<TransformGlobalWithSelect<T, TSlug, TSelect>> {
		return findGlobal(this, options, init);
	}

	findGlobalVersionByID<
		TSlug extends GlobalSlug<T>,
		TDisableErrors extends boolean,
	>(
		options: FindGlobalVersionByIDOptions<T, TSlug, TDisableErrors>,
		init?: RequestInit
	): Promise<
		ApplyDisableErrors<
			TypeWithVersion<DataFromGlobalSlug<T, TSlug>>,
			TDisableErrors
		>
	> {
		return findGlobalVersionByID(this, options, init);
	}

	findGlobalVersions<TSlug extends GlobalSlug<T>>(
		options: FindGlobalVersionsOptions<T, TSlug>,
		init?: RequestInit
	): Promise<PaginatedDocs<TypeWithVersion<DataFromGlobalSlug<T, TSlug>>>> {
		return findGlobalVersions(this, options, init);
	}
	findVersionByID<
		TSlug extends CollectionSlug<T>,
		TDisableErrors extends boolean,
	>(
		options: FindVersionByIDOptions<T, TSlug, TDisableErrors>,
		init?: RequestInit
	): Promise<
		ApplyDisableErrors<
			TypeWithVersion<DataFromCollectionSlug<T, TSlug>>,
			TDisableErrors
		>
	> {
		return findVersionByID(this, options, init);
	}

	findVersions<TSlug extends CollectionSlug<T>>(
		options: FindVersionsOptions<T, TSlug>,
		init?: RequestInit
	): Promise<PaginatedDocs<TypeWithVersion<DataFromCollectionSlug<T, TSlug>>>> {
		return findVersions(this, options, init);
	}

	async request({
		args = {},
		file,
		init: incomingInit,
		json,
		method,
		path,
	}: {
		args?: OperationArgs;
		file?: Blob;
		init?: RequestInit;
		json?: unknown;
		method: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
		path: string;
	}): Promise<Response> {
		const headers = new Headers({
			...this.baseInit.headers,
			...incomingInit?.headers,
		});

		const init: RequestInit = {
			method,
			...this.baseInit,
			...incomingInit,
			headers,
		};

		if (json) {
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("_payload", JSON.stringify(json));
				init.body = formData;
			} else {
				headers.set("Content-Type", "application/json");
				init.body = JSON.stringify(json);
			}
		}

		const response = await this.fetch(
			`${this.baseURL}${path}${buildSearchParams(args)}`,
			init
		);

		return response;
	}

	restoreGlobalVersion<TSlug extends GlobalSlug<T>>(
		options: RestoreGlobalVersionByIDOptions<T, TSlug>,
		init?: RequestInit
	): Promise<TypeWithVersion<DataFromGlobalSlug<T, TSlug>>> {
		return restoreGlobalVersion(this, options, init);
	}

	restoreVersion<TSlug extends CollectionSlug<T>>(
		options: RestoreVersionByIDOptions<T, TSlug>,
		init?: RequestInit
	): Promise<DataFromCollectionSlug<T, TSlug>> {
		return restoreVersion(this, options, init);
	}

	update<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: UpdateManyOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<BulkOperationResult<T, TSlug, TSelect>>;

	update<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: UpdateByIDOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<TransformCollectionWithSelect<T, TSlug, TSelect>>;

	/**
	 * @description Update one or more documents
	 * @param options
	 * @returns Updated document(s)
	 */
	update<
		TSlug extends CollectionSlug<T>,
		TSelect extends SelectFromCollectionSlug<T, TSlug>,
	>(
		options: UpdateOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<
		| BulkOperationResult<T, TSlug, TSelect>
		| TransformCollectionWithSelect<T, TSlug, TSelect>
	> {
		return update(this, options, init);
	}

	updateGlobal<
		TSlug extends GlobalSlug<T>,
		TSelect extends SelectFromGlobalSlug<T, TSlug>,
	>(
		options: UpdateGlobalOptions<T, TSlug, TSelect>,
		init?: RequestInit
	): Promise<TransformGlobalWithSelect<T, TSlug, TSelect>> {
		return updateGlobal(this, options, init);
	}
}
