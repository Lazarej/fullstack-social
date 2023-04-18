import Layout from "@/components/layout/layout";
import PostForm from "@/components/postForm/postForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "@/components/post/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  }, []);


  const getPost = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/posts/feed`,
        {
          withCredentials: true,
        }
      );
      setPosts((prev) => (prev = res.data.posts));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <main className="flex h-screen flex-col items-center justify-between p-10 w-full overflow-y-scroll mb-40">
        <PostForm updatePost={getPost} />
        <div className="w-full items-center flex flex-col mt-8">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
