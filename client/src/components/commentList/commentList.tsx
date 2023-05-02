import axios from "axios";
import { comment } from "postcss";
import { useEffect, useState } from "react";
import Comment from "../comment/comment";



export default function CommentList(props: { id: number; }) {

    const [comments, setComment] = useState([])

    useEffect(() => {
        GetComments()
    },[])

    const GetComments = async () => {
        
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/comments/${props.id}`,   {
        withCredentials: true,
      })
            setComment(prev => prev = response.data.comments)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="w-full flex flex-col items-center p-4">
           {
            comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
        ))
          
          
        }</div>
    )
}