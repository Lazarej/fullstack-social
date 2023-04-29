import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../userAvatar/userAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { start } from "repl";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CommentForm from "../commentForm/CommentForm";

interface Props {
  post: {
    text: string;
    image: string;
    UserId: number;
    commentCount:number
    User?: {
      avatar?: string;
      email: string;
      name: string;
    };
  };
}

export default function Post(props: Props) {
  
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  let callback = (entries: any[], observer: any) => {
    entries.forEach((entry: { isIntersecting: any; }) => {
      if (entry.isIntersecting) {
        setInView(true)
      }
    });
  }
   
  useEffect(() => {
    let observer = new IntersectionObserver(callback)
    if (ref?.current) { 
      observer.observe(ref.current)
    }
    return () => {
      if (ref?.current) {
          observer.unobserve(ref.current!)
      }
    }
 }, []);

  return inView ? (
    <div  className="bg-white rounded-md border-2 border-greyUL w-4/6 p-4 mb-8">
      <div className="flex justify-end">
        <FontAwesomeIcon
          icon={faEllipsis}
          size="lg"
          style={{ color: "#000" }}
        />
      </div>
      <div className="w-full">
        <Link href={`/profil/${props.post.UserId}`}>
          {props.post.User ? (
            <div className="mb-4 flex">
              <div className="h-12 w-12">
                <UserAvatar change={false} img={props.post.User.avatar} />
              </div>

              <div className="ml-3 ">
                <p className=" font-monumentR text-sm min-w-[100px]">
                  {props.post.User.name}
                </p>
              </div>
            </div>
          ) : null}
        </Link>
        <div className="border-b-greyUL border-b-2">
          <p>{props.post.text}</p>

            {props.post.image ? (
            <div className="bg-black mt-5 w-full h-80 flex justify-center items-center rounded-sm">
              <img
              className="h-full my-6"
              src={`${process.env.NEXT_PUBLIC_DOMAIN}${props.post.image}`}
              alt=""
            />
            </div>
          ) : null}
          <div className="w-full flex justify-end pb-2 pt-4">
            <p className="font-robotoR text-greyL">{props.post.commentCount} commentaires</p>
          </div>
           </div>
        <div className="w-full flex p-4">
             <CommentForm/>
        </div>
      </div>
    </div>
  ) : (
      <div ref={ref} className="w-full bg-primary m-9 h-96">

      </div>
  )
}
