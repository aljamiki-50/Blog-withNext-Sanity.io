import Header from "@/app/components/Header/Header";
import { client } from "@/sanity/lib/client";
import { post } from "@/sanity/schemas/post";
import Link from "next/link";
import React from "react";

async function getAllTags() {
  // this is a commment here so the posCount command or querey here been invented through to count the post at the tags
  // so better refer to the documentation to get through it  or tut
  const query = `
  *[_type== "tag"]{
    _id,
      name,
      slug,
      
      "postCount": count(*[_type=="post" && references("tags",^._id)]) 
  }
    
  `;
  const data = await client.fetch(query);
  console.log("new data", data);
  return data;
}
console.log("hey");

export const revalidate = 60;

const page = async () => {
  const tags = await getAllTags();
  console.log(tags.name, "you tags");

  return (
    <div>
      <Header title={"Tags"} />
      {tags?.length > 0 &&
        tags.map((tag) => (
          <Link href={`tag/${tag?.slug.current}`}>
            <div
              key={tags?._id}
              className=" lowercase dark:bg-gray-950 text-sm mb-2 p-2 dark:border border-gray-900 hover:text-purple-900 cursor-pointer"
            >
              #{tag?.name} ({tag?.postCount})
            </div>
          </Link>
        ))}
    </div>
  );
};

export default page;
