import { Rule } from "postcss";
export const post = {
  name: "post",
  // should be a capital
  title: "Post",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      //   validation: (Rule) => Rule.required().max(1800).warning("Not 10 time "),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      //   validation: (Rule) =>
      //     Rule.required().max(150).warning("Shorter titles are usually better"),
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      intialValue: () => toISOString(),
    },
    {
      name: "exerpt",
      title: "Exerpt",
      type: "text",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      //   The off array acting like adding a extras to the shelf
      of: [
        // The "of"-property must be set, and it must be an array
        {
          type: "block", // type is required
        },
        {
          type: "image", // type is required
          fields: [{ type: "text", name: "alt", title: "ALT" }],
        },
      ],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      //    The type "tag" is refering to the tha name:tag at tag.js file
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
  ],
};
