import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth";
import UserAvatar from "@/components/userAvatar/userAvatar";
import PostForm from "@/components/postForm/postForm";
import Post from "@/components/post/Post";

export default function Profil() {
  const router = useRouter();
  const id: any = router.query.id;
  const [profilData, setProfilData] = useState({
    banner: "",
    avatar: "",
    name: "",
    Posts: [],
    friendsCount: 0,
    relation:""
  });
  const context = useContext(AuthContext);

  useEffect(() => {
    if (router.isReady) {
      getUser();
    }
  }, [router.isReady]);

  const getUser = async () => {
    try {
      const resUser = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}api/user/${id}`,
      {
        withCredentials: true,
      }
    );
     const resFriend = await axios.post(
       `${process.env.NEXT_PUBLIC_DOMAIN}api/user/isFriends`,
      resUser.data.user,
      {
        withCredentials: true,
      }
    );
    setProfilData((prev) => (prev = { ...resUser.data.user, friendsCount: resUser.data.friendsCount , relation:resFriend.data.relation}));
    } catch (error) {
      console.error(error)
    }
  };

  const sendfriendinvitation = async() => {
   try {
     const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/notification/friend`,
      profilData,
      {
        withCredentials: true,
      }
    )
    console.log(res.data)
   } catch (error) {
    console.error(error)
   }
  }

  const imageChanger = async (e: ChangeEvent) => { 
    e.preventDefault();
    try {
      const name = (e.target as HTMLInputElement).name
    const files = (e.target as HTMLInputElement).files!
    const formData = new FormData();
      formData.append(`${name}`, files[0] as unknown as Blob | string);
      console.log(formData)
      const resUserponse = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN}api/user`,  formData,
        {
          withCredentials: true,
        }
      )
      context.saveUser({...resUserponse.data.update})
      getUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <main className="flex h-screen pb-40 flex-col w-full overflow-y-scroll">
        <img
          src={
            profilData.banner
              ? `${process.env.NEXT_PUBLIC_DOMAIN}${profilData.banner}`
              : "/images/default-banner.jpg"
          }
          onClick={context.auth.id === +id ? () => document.getElementById("banner")?.click() : () => {}}
          className="w-full h-80 cursor-pointer"
        />
         <input
            onChange={(e) =>
              imageChanger(e)
            }
            type="file"
            accept="image/png, image/jpeg"
            id="banner"
            name="banner"
            hidden
          />
        <div className="w-full h-40  flex items-center  justify-between px-10 mb-16">
          <div className="flex items-center">
            <div className="h-48 w-48 mr-4 " onClick={() => document.getElementById("avatar")?.click()}>
            <input
            onChange={(e) =>
              imageChanger(e)
            }
            type="file"
            accept="image/png, image/jpeg"
            id="avatar"
            name="avatar"
            hidden
          />
            <UserAvatar
              change={context.auth.id === +id ? true : false}
              img={profilData.avatar}
            />
          </div>
          <div className="flex flex-col">
            <p className="font-monumentR text-xl">{profilData.name}</p>
            <p className="font-robotoR text-greyN">
              {profilData.friendsCount} amis
            </p>
          </div>
          </div>
          {profilData.relation === 'friend' ? null : profilData.relation === 'sent' ? <p className="uppercase font-robotoR">Invitation envoyé</p>: profilData.relation === 'receive' ? <button onClick={() => sendfriendinvitation()} className=" p-2 w-40 bg-primary text-white rounded-lg uppercase font-robotoR text-sm h-14 ">Accepter l'invitation</button>: <button onClick={() => sendfriendinvitation()} className=" p-2 w-40 bg-primary text-white rounded-lg uppercase font-robotoR text-sm h-14 ">demande de relation</button>}
        </div>
        <div className="flex flex-col items-center">
          {context.auth.id === +id ? <PostForm updatePost={getUser} /> : null}
          { profilData.relation === 'friend' ? profilData.Posts.map((post, index) => (
            <Post key={index} post={post} />
          )) : null}
        </div>
      </main>
    </Layout>
  );
}
