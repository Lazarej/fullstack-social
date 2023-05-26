import axios from "axios";
import { useEffect, useState } from "react";
import UserAvatar from "../userAvatar/userAvatar";
import { isNullishCoalesce } from "typescript";

export default function DropDown(props: any) {
  useEffect(() => {
    console.log("dzdzadaz", props.data);
  });

  const addFriend = async (notifId: number, senderId: number) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}api/notification/addFriend`,
      {
             senderId: senderId,
      notifId:  notifId
       },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <div
      className={`bg-white   ${
        props.open ? "h-52 py-6 px-2 border-2" : " h-0"
      } absolute duration-75 top-[110%]  w-96 right-0  border-greyUL rounded-sm flex flex-col overflow-hidden overflow-y-scroll`}
    >
      {props.data.map((notif: any, index: number) => (
        <div
          className="w-full border-b-[1px] border-greyUL pb-2 flex justify-between"
          key={index}
        >
          <div className="flex">
            <div className="h-10 w-10">
              <UserAvatar img={notif.sender.avatar} change={false} />
            </div>
            <p className="ml-2 text-xs text-greyN">
              <p className="text-sm text-black">{notif.sender.name}</p> 
                { notif.action === 'comment' ? <p>a commenter votre profil</p> : notif.isFriendRequest ? <p> vous a demander en ami</p> : null}
            </p>
          </div>
          {
            notif.isFriendRequest ? <p
            className="font-robotoR text-primary"
            onClick={() => addFriend(notif.id, notif.sender.id)}
          >
            Accepter
          </p>: null
          }
        </div>
      ))}
    </div>
  );
}
