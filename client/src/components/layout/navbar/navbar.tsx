import UserAvatar from "@/components/userAvatar/userAvatar";
import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { useContext } from "react";


export default function Navbar() {

     const context = useContext(AuthContext);
    
    return (
        <nav className="w-[100vw] h-16 border-b-2 border-greyUL flex justify-between px-10">
            <div className=" w-2/6  h-full flex items-center">
                <Link href='/'>
                    <h1 className="font-monumentR "> Jullius Social</h1>
                </Link>        
            </div>
            <div className="flex justify-center items-center">
                <div className="h-11 w-11" onClick={(e) => context.Logout() }>
                    <UserAvatar change={false} img={context.auth.avatar}/>

                </div>

            </div>
            
       </nav>
    )
}