import type { GlobalConfig } from "payload";
import { isPublic } from "@/access";
import { revalidateGlobal } from "@/hooks/revalidate-global";

export const Site: GlobalConfig = {
  slug: "site",
  label: "网站信息",
  admin: {
    group: "设置相关",
    description: "配置网站信息，用作 SEO 优化",
  },
  access: {
    read: isPublic,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "网站名称",
      required: true,
      defaultValue: "Llavero Switch",
    },
    {
      name: "logo",
      type: "upload",
      label: "网站 Logo",
      relationTo: "media",
      required: true,
      admin: {
        description: "选择 svg 格式的图片",
      },
    },
    {
      name: "slogan",
      type: "textarea",
      label: "网站标语",
      required: false,
      admin: {
        placeholder: "输入品牌英文标语，可选",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "网站描述",
      required: false,
      admin: {
        placeholder: "输入网站英文描述，可选，用于 SEO 优化",
      },
    },
    {
      name: "keywords",
      type: "text",
      label: "网站关键词",
      required: false,
      hasMany: true,
      admin: {
        placeholder: "请输入网站英文关键词，按回车输入多个",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
