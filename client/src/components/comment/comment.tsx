import { useEffect } from "react";
import UserAvatar from "../userAvatar/userAvatar";
import Link from "next/link";

interface Props{
    comment: {
        text: string,
        UserId: number
        User:{avatar:string}
    }
}


export default function Comment(props: Props) {

    useEffect(() => {
    })
    return (
        <div className="flex w-full my-2  pb-4 border-b -[1px] border-greyUL">
            <Link href={`/profil/${props.comment.UserId}`} className="w-8 h-8 mr-2 cursor-pointer">
                <UserAvatar change={false} img={props.comment.User.avatar} />
               
            </Link>
           <p className="text-greyN align-baseline text-end leading-10">{props.comment.text}</p>
            
         </div>
     )
}