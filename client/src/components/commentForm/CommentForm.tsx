import { useContext } from "react";
import UserAvatar from "../userAvatar/userAvatar";
import { AuthContext } from "@/context/auth";


export default function CommentForm() {
    const context = useContext(AuthContext)
    return (
        <div className="flex justify-center items-center w-full">
            <div className="h-8 w-8 mr-2">
                <UserAvatar change={false} img={context.auth.avatar } />

            </div>
            <form className="w-full">
                <input type="text"  placeholder="Ecrivez un commentaire" className="w-full border-2 pl-4 h-10 rounded-full border-greyUL "/>
            </form>
      </div>
    )
}