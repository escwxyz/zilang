import { NumberField } from "@nouance/payload-better-fields-plugin/Number";
import type { CollectionConfig } from "payload";
import { revalidateCollection } from "@/hooks/revalidate-collection";

export const Packaging: CollectionConfig = {
  slug: "packaging",
  admin: {
    group: "产品相关",
    useAsTitle: "title",
  },
  labels: {
    singular: "包装规格",
    plural: "包装规格",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "标题",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "描述",
    },
    {
      name: "size",
      label: "包装尺寸",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            ...NumberField(
              {
                name: "length",
                label: "长度",
                required: true,
                min: 0,
                defaultValue: 49.5,
              },
              {
                suffix: " cm",
                decimalScale: 1,
                fixedDecimalScale: true,
              }
            ),
            ...NumberField(
              {
                name: "width",
                label: "宽度",
                required: true,
                min: 0,
                defaultValue: 29.0,
              },
              {
                suffix: " cm",
                decimalScale: 1,
                fixedDecimalScale: true,
              }
            ),
            ...NumberField(
              {
                name: "height",
                label: "高度",
                required: true,
                min: 0,
                defaultValue: 35,
              },
              {
                suffix: " cm",
                decimalScale: 1,
                fixedDecimalScale: true,
              }
            ),
          ],
        },
      ],
    },
    ...NumberField(
      {
        name: "quantity",
        label: "装箱数",
        required: true,
        min: 0,
        defaultValue: 20,
      },
      {
        suffix: " 只",
      }
    ),
    ...NumberField(
      {
        name: "weight",
        label: "包装重量",
        required: true,
        min: 0,
        defaultValue: 17,
      },
      {
        suffix: " kg",
        decimalScale: 1,
        fixedDecimalScale: true,
      }
    ),
  ],
  hooks: {
    afterChange: [revalidateCollection],
  },
};
