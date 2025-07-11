import type { CollectionBeforeChangeHook } from "payload";
import sharp from "sharp";
import type { Media } from "@/payload-types";

export const generateBlurDataUrl: CollectionBeforeChangeHook<Media> = async ({
  data,
  req,
  operation,
}) => {
  if (
    req.file?.data &&
    operation === "update" &&
    !req.file.mimetype.includes("svg") &&
    req.file.mimetype.includes("image")
  ) {
    const buffer = await sharp(req.file.data)
      .resize({
        width: 8,
      })
      .toFormat("webp")
      .toBuffer();

    const base64 = buffer.toString("base64");

    data.blurDataUrl = `data:image/webp;base64,${base64}`;

    return data;
  }
};
