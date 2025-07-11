import type { CollectionConfig } from "payload";
import { isAdmin, isPublic } from "@/access";
import { revalidateCollection } from "@/hooks/revalidate-collection";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "常见问题",
    plural: "常见问题",
  },
  admin: {
    group: "内容相关",
    useAsTitle: "question",
  },
  access: {
    create: isAdmin,
    read: isPublic,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "question",
      type: "text",
      label: "问题",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      label: "答案",
      required: true,
    },
    {
      name: "type",
      type: "select",
      label: "类型",
      required: true,
      options: [
        {
          label: "一般问题（放在非产品页）",
          value: "general",
        },
        {
          label: "产品问题（放在产品页）",
          value: "product",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCollection],
  },
};
