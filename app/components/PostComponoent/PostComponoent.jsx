import Link from "next/link";
import React from "react";
import { Lilita_One, VT323 } from "next/font/google";
import { data } from "autoprefixer";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dataFont = VT323({ weight: "400", subsets: ["latin"] });

function PostComponoent({ post }) {
  // console.log(post.slug.current);
  return (
    <div className={cardStyle}>
      <Link href={`/posts/${post?.slug?.current}`}>
        <h2 className={`${font.className} text-xl  dark:text-slate-400`}>
          {post.title}
        </h2>
        <p className={`${dataFont.className} my-2 text-purple-800 text-xl `}>
          {new Date(post?.publishedAt).toDateString()}
        </p>
        <p className="  dark:text-gray-400 mb-4 line-clamp-2">{post.exerpt}</p>
      </Link>
      {/* adding tags down here   */}
      <div>
        {post?.tags?.map((tag) => (
          <span
          
            className=" mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-500 border dark:border-gray-900 "
            key={tag?._id}
          >
            #{tag?.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PostComponoent;

const cardStyle = `
      mb-8
      p-4
      border border-gray-900  rounded-md shadow-purple-950 hover:shadow-md hover:bg-purple-500 hover:text-white hover:dark:bg-gray-950

`;
