import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth";
import UserAvatar from "@/components/userAvatar/userAvatar";

export default function Profil() {
    const router = useRouter();
    const { id } = router.query;
    const [profilData, setProfilData] = useState({
        banner: '',
        avatar:''
    })
    const context = useContext(AuthContext)

    useEffect(() => {
        if (router.isReady) {
            getUser();
            console.log(context)
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
        setProfilData(prev => prev = {...res.data.user})
    };

    return (
        <Layout>
           
            <div className="flex flex-col w-full">
                 <img src={profilData.banner ? '' : '/images/default-banner.jpg'} onClick={context.auth.id === id ? () => { } : () => { }} className="w-full h-80 cursor-pointer" />
                <div className="w-full h-40  flex items-end px-10">
                    <div className="h-48 w-48 ">
                        <UserAvatar change={ context.auth.id === id ? true : false} img={profilData.avatar} />
                    </div>

            </div>
           </div>
           

        </Layout>

    )
}