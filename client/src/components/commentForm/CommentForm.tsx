import { KeyboardEvent, useContext, useEffect, useState } from "react";
import UserAvatar from "../userAvatar/userAvatar";
import { AuthContext } from "@/context/auth";
import axios from "axios";

interface Props{
    id:number
}

export default function CommentForm(props: Props) {
    const context = useContext(AuthContext)

    const [comment, setComment] = useState({
        text: '',
        PostId: props.id
    })

    const createComment = async (e: KeyboardEvent<HTMLFormElement>) => {
        const key = e.key === 'Enter'
        if (key) {
            e.preventDefault()
            try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}api/comments`,comment,  {
            withCredentials: true,
          })
            console.log(response.data) 
                setComment(prev => prev = {...comment, text:''})
        } catch (error) {
            console.error(error)
        }
       }
    }

    useEffect(() => {

    },[comment])
    return (
        <div className="flex justify-center items-center w-full">
            <div className="h-8 w-8 mr-2">
                <UserAvatar change={false} img={context.auth.avatar } />

            </div>
            <form className="w-full" onKeyDown={(e) => createComment(e)}>
                <input type="text" value={comment.text}  onChange={(e) => setComment(prev => prev = {...comment, text: e.target.value})}  placeholder="Ecrivez un commentaire" className="w-full border-2 pl-4 h-10 rounded-full border-greyUL "/>
            </form>
      </div>
    )
}