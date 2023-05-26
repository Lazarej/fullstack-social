import Searchbar from "@/components/searchbar/searchbar";
import UserAvatar from "@/components/userAvatar/userAvatar";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import FriendWrapper from "@/components/notificationWrapper/friendWrapper";
import ActuWrapper from "@/components/notificationWrapper/actuWrapper";

export default function Navbar() {

     const context = useContext(AuthContext);
    
    return (
        <nav className="w-[100vw] h-16 border-b-2 border-greyUL flex justify-between">
            <div className="w-1/6 min-w-[300px] h-full flex items-center">
                <Link href='/' className="ml-10">
                    <h1 className="font-monumentR "> Jullius Social</h1>
                </Link>        
            </div>
            <div className="w-full flex  items-center justify-between">
                <Searchbar />
                <div className="flex items-end h-full pb-2">
                    <FriendWrapper />
                    <ActuWrapper/>
                <div className="mr-10 h-11 w-11" onClick={(e) => context.Logout()}>
                   
                    <UserAvatar change={false} img={context.auth.avatar}/>

                </div>
                </div>

            </div>
            
       </nav>
    )
}