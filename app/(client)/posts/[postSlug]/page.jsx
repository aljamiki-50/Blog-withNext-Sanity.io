import Header from "@/app/components/Header/Header";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { data } from "autoprefixer";
import { Lilita_One, VT323 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dataFont = VT323({ weight: "400", subsets: ["latin"] });

async function getPostBySlug(slug) {
  //  we desctruct the post slug cause it need to be shown as fully postSlug and we returuing the 1st arrat and we geetinng object
  const query = ` 
  *[_type== "post" && slug.current == "${slug.postSlug}" ][0]{
    title,
     slug,
    exerpt,
    body,
    publishedAt,
      tags[]->{
        _id,
        name,
        slug
      }
      }
          `;

  const data = await client.fetch(query);

  // console.log(data), "the array";
  return data;
}

// one of the crucial statment here cause it caches out every time page would be mount the number denotes to sec
// so basically every 60 secs

export const revalidate = 60;

const page = async ({ params }) => {
  // console.log(params.postSlug);
  const post = await getPostBySlug(params);

  //  here we add the not found from next but we create a page in the post called not-found as the convention says
  //  so it will route us directly if the use coudln t be routeed probably

  if (!post) {
    notFound();
  }
  
  return (
    <div className=" text-center">
      <Header title={post?.title} />
      <div className="text-center">
        <span className={`${dataFont.className} text-purple-800`}>
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className=" mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-500 border dark:border-gray-900 ">
                #{tag?.name}
              </span>
            </Link>
          ))}
        </div>
        {/* the portable component here we installed frm sanity portable component via  npm install --save @portabletext/react you can refer to it in sanity if you look to */}
        <div className={richTextStyles}>
          <PortableText
            value={post?.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

const richTextStyles = `
  mt-14
  text-justify
  mx-auto
  prose-headings:my-5 
  prose-headings:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:ml-4
`;

const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        // the url image here we got it from sanity lib to handle image for and  we passed to  our saniy component which installed through the above comand
        // it s important to cut off the url() cause it will not accept it with and in next config file need to add image hosts and https to undersands where it locates them
        src={urlForImage(value)}
        alt="post"
        width={500}
        height={200}
        className=" rounded-2xl object-fill py-2 h-[80] w-full mx-auto text-center"
      />
    ),
    // callToAction: ({ value, isInline }) =>
    //   isInline ? (
    //     <a href={value.url}>{value.text}</a>
    //   ) : (
    //     <div className="callToAction">{value.text}</div>
    //   ),
  },

  // marks: {
  //   link: ({children, value}) => {
  //     const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
  //     return (
  //       <a href={value.href} rel={rel}>
  //         {children}
  //       </a>
  //     )
  //   },
  // },
};

const YourComponent = (props) => {
  return (
    <PortableText value={props.value} components={myPortableTextComponents} />
  );
};
