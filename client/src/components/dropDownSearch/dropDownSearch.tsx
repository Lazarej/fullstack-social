import { useEffect, useState } from "react";
import UserAvatar from "../userAvatar/userAvatar";
import Link from "next/link";

export default function DropDownSearch(props: { result: any[] }) {

    const [state, setState] = useState(false)
        const input = document.getElementById('search');
const box = document.querySelector('.box');

input?.addEventListener('focus', () => {
  setState(prev=> prev  = true)
});

input?.addEventListener('blur', () => {
    setTimeout(() => {
    return setState(prev=> prev  = false)  
  },100)
});

    useEffect(() => {

    },[])

  return (
    <div id='dropDownSearch'
      className={`bg-white   ${
        state === true
          ? "h-52 py-6 px-2"
          :" h-0"
      } w-full absolute top-2/4 border-2 border-greyUL rounded-sm flex flex-col overflow-hidden overflow-y-scroll`}
    >
      {props.result.map((user, index) => (

               <a key={index} href={`/profil/${user.id}`} >
          <div className="flex p-2 border-b-2 border-greyUL cursor-pointer">
            <div className="h-10 w-10">
              <UserAvatar change={false} img={user.avatar} />
            </div>
            <div className="ml-2">
              <p>{user.name}</p>
            </div>
          </div>
        </a>

      ))}
    </div>
  );
}
