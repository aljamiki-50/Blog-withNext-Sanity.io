import Header from "@/app/components/Header/Header";
import PostComponoent from "@/app/components/PostComponoent/PostComponoent";
import { client } from "@/sanity/lib/client";
import { post } from "@/sanity/schemas/post";
import React from "react";

async function getPostByTag(slug) {
  // the query we passed here it s not the only option we can still use other option as within the id of the post passed
  // as a string to our refrence

  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${slug}"]._id)]
    {
        title,
         slug,
          exerpt,
          publishedAt,
          
          tags[]->{
            _id,name,slug
          }
        }


    `;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60

const page = async ({ params }) => {
  const posts = await getPostByTag(params.slug);
//   console.log(tag.exerpt);
  return (
    <div>
      <Header tags title={`#${params?.slug}`} />
      <div>
        {posts?.length > 0 && posts?.map((post) => (
          
            <div>
              <PostComponoent key={post?._id} post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
