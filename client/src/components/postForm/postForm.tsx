import { AuthContext } from "@/context/auth";
import { ChangeEvent, useContext, useState } from "react";
import Button1 from "../button";
import UserAvatar from "../userAvatar/userAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function PostForm() {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    text: "",
    image: null,
  });

  const AddPost = async (e: Event) => {
   e.preventDefault();
   try {
     const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}post`,form,
          {
            withCredentials: true,
      })
     console.log(res.data)
   } catch (error) {
    
   }
  };
  
 

  return (
    <div className="bg-white rounded-md border-2 border-greyUL w-5/6 p-8 pb-4">
      <form className="w-full">
        <div className="h-12 w-12 mb-2">
          <UserAvatar change={false} />
        </div>
        <textarea
          className="w-full p-2 rounded-sm resize-none  h-32"
          placeholder={`Qu'es ce que vous avez en tête ${authContext.auth.name} ? `}
          onChange={(e: ChangeEvent) => setForm((prev) => (prev = { ...form, text: e.target.value }))}
        />
        {form.image ? <img className=" max-h-96" src={URL.createObjectURL(form.image)} /> : null}
        <div className="w-full flex justify-between items-end mt-4 border-t-2 border-greyUL">
          <input
            onChange={(e: ChangeEvent) => setForm((prev) => (prev = { ...form, image: e.target.files[0] }))}
            type="file"
            accept="image/png, image/jpeg"
            id="postImg"
            name="postImg"
            hidden
          />
          <FontAwesomeIcon
            className="text-greyL hover:text-primary duration-300 cursor-pointer"
            size="xl"
            icon={faImage}
            onClick={() => document.getElementById("postImg")?.click()}
          />
          <Button1 onClick={(e) => AddPost(e)} text="Publier" />
        </div>
      </form>
    </div>
  );
}
