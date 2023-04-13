import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import Button1 from "../button";
import UserAvatar from "../userAvatar/userAvatar";

export default function PostForm() {
  const authContext = useContext(AuthContext);
  return (
    <div className="bg-white rounded-md border-2 border-greyUL w-5/6 p-8 pb-4">
          <form className="w-full">
              <div className="h-12 w-12 mb-2">
                  <UserAvatar change={ false} />
              </div>
        <textarea
          className="w-full p-2 rounded-sm resize-none border-b-2 border-greyUL h-32"
          placeholder={`Qu'es ce que vous avez en tête ${authContext.auth.name} ? `}
              />
              <div className="w-full flex justify-end">
                  <Button1 onClick={() =>{}} text='Publier'/>
              </div>
      </form>
    </div>
  );
}
