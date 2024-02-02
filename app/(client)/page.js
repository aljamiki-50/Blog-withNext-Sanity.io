// the importance of the client it self  to be use in to query the DB or sanity here
import { client } from "@/sanity/lib/client";
import Header from "../components/Header/Header";
import PostComponoent from "../components/PostComponoent/PostComponoent";

async function getPosts() {
  //  the query is coming from our sanity vesion as we quering there
  // look at the way we fetched the tag cause its been refrenced  that s why we need to resolve it according to grod sanity language
  const query = `
  *[_type== "post"]{
  title,
   slug,
    exerpt,
    publishedAt,
    
    tags[]->{
      _id,name,slug
    }
}`;
  const data = await client.fetch(query);

  // we make sure that the data would be returning othere wise ewe can t see it

  return data;
}

// one of the crucial statment here cause it caches out every time page would be mount the number denotes to sec 
// so basically every 60 secs

export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts();
  // console.log("is working");
  // console.log(posts, "here we go");
  return (
    <div>
      <Header title={"Articles"} tags />
      <div>
        {posts?.length > 0 &&
          posts?.map((post) => <PostComponoent key={post._id} post={post} />)}
      </div>
    </div>
  );
}
