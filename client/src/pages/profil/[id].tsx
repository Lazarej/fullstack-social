import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth";
import UserAvatar from "@/components/userAvatar/userAvatar";
import PostForm from "@/components/postForm/postForm";
import Post from "@/components/post/Post";

export default function Profil() {
  const router = useRouter();
  const { id } = router.query;
  const [profilData, setProfilData] = useState({
    banner: "",
    avatar: "",
    name: "",
    friends: [],
    Posts: [],
  });
  const context = useContext(AuthContext);

  useEffect(() => {
    if (router.isReady) {
      getUser();
      console.log(profilData);
    }
  }, [router.isReady]);

  const getUser = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}api/user/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
    setProfilData((prev) => (prev = { ...res.data.user }));
  };

  return (
    <Layout>
      <div className="flex h-screen pb-40 flex-col w-full overflow-y-scroll">
        <img
          src={
            profilData.banner
              ? `${process.env.NEXT_PUBLIC_DOMAIN}${profilData.banner}`
              : "/images/default-banner.jpg"
          }
          onClick={context.auth.id === id ? () => {} : () => {}}
          className="w-full h-80 cursor-pointer"
        />
        <div className="w-full h-40  flex items-center px-10 mb-16">
          <div className="h-48 w-48 mr-4 " onClick={() => console.log('click')}>
            <UserAvatar
              change={context.auth.id === id ? true : false}
              img={profilData.avatar}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-monumentR text-xl">{profilData.name}</p>
            <p className="font-robotoR text-greyN">
              {profilData.friends.length} amis
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {context.auth.id === id ? <PostForm updatePost={() => {}} /> : null}
          {profilData.Posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
