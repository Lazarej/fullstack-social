import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "../userAvatar/userAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { start } from "repl";
import { useEffect } from "react";
import Link from "next/link";

interface Props {
  post: {
    text: string;
    image: string;
    UserId: number;
    User?: {
      avatar?: string;
      email: string;
      name: string;
    };
  };
}

export default function Post(props: Props) {
  useEffect(() => {}, []);

  return (
    <div className="bg-white rounded-md border-2 border-greyUL w-5/6 p-4 mb-8">
      <div className="flex justify-end">
        <FontAwesomeIcon
          icon={faEllipsis}
          size="lg"
          style={{ color: "#000" }}
        />
      </div>
      <form className="w-full">
        <Link href={`/profil/${props.post.UserId}`}>
          {props.post.User ? (
            <div className="h-12 w-12 mb-4 flex">
              <UserAvatar change={false} img={props.post.User.avatar} />
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
            <img
              className="w-full h-56 my-6"
              src={`${process.env.NEXT_PUBLIC_DOMAIN}${props.post.image}`}
              alt=""
            />
          ) : null}
        </div>

        <div className="w-full flex justify-end"></div>
      </form>
    </div>
  );
}
