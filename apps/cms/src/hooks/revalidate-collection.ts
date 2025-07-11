import { APIError, type CollectionAfterChangeHook } from "payload";

export const revalidateCollection: CollectionAfterChangeHook = async ({
  collection,
  operation,
  doc,
  req,
}) => {
  if (
    req.context?.skipRevalidation ||
    (collection.versions?.drafts && doc?._status !== "published")
  ) {
    return;
  }

  if (!process.env.CLOUDFLARE_REVALIDATE_URL) {
    throw new APIError(
      "CLOUDFLARE_REVALIDATE_URL is not set. Please set it in the environment variables."
    );
  }

  try {
    const response = await fetch(`${process.env.CLOUDFLARE_REVALIDATE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
        ...(process.env.PAYLOAD_SECRET
          ? { "X-Payload-Secret": process.env.PAYLOAD_SECRET }
          : {}),
      },
      body: JSON.stringify({
        content: collection.slug,
        docId: doc.id,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    req.payload.logger.info({
      msg: `Revalidation triggered for ${collection.slug}:${doc.id}`,
      collection: collection.slug,
      operation,
      docId: doc.id,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV === "production") {
      req.payload.logger.error({
        msg: `Failed to trigger revalidation: ${errorMessage}`,
        collection: collection.slug,
        docId: doc.id,
      });
    } else {
      throw new APIError(`Failed to trigger revalidation: ${errorMessage}`);
    }
  }
};
