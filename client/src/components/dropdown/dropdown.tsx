import axios from "axios";
import { useEffect, useState } from "react";
import UserAvatar from "../userAvatar/userAvatar";


export default function DropDown(props: any) {
    

    useEffect(() => {
        console.log('dzdzadaz' , props.data )
    })
  

  return (
    <div
      className={`bg-white   ${
        props.open  ? "h-52 py-6 px-2 border-2" : " h-0"
      } absolute duration-75 top-[110%]  w-96 right-0  border-greyUL rounded-sm flex flex-col overflow-hidden overflow-y-scroll`}
      >
          {
              props.data.map((notif:any, index:number) => (
                  <div className="w-full border-b-[1px] border-greyUL pb-2 flex justify-between" key={index}>
                      <div className="flex">
                          <div className="h-10 w-10">
                          <UserAvatar img={notif.sender.avatar} change={false} />
                          </div>
                          <p className="ml-2 text-xs text-greyN"> <p className="text-sm text-black">{ notif.sender.name}</p> vous a demandé en ami</p>
                      </div>
                      <p className=" font-robotoR text-primary">Accepter</p>
                  </div>
              ))
          }
    </div>
  );
}