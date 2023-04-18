import { AuthContext } from "@/context/auth";
import { ChangeEvent, useContext, useState } from "react";
import Button1 from "../button";
import UserAvatar from "../userAvatar/userAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Props{
  updatePost: Function
}

export default function PostForm(props: Props) {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    text: "",
    image: null,
  });

  const AddPost = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("text", form.text);
    try {
      if (form.image || form.text) {
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/post`,
        formData,
        {
          withCredentials: true,
        }
      );
      await props.updatePost() 
      setForm( prev => prev = {text:"", image: null})
     }
    } catch (error) {
      console.error(error);
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
          value={form.text}
          onChange={(e: ChangeEvent) =>
            setForm((prev) => (prev = { ...form, text: e.target.value }))
          }
        />
        {form.image ? (
          <img className=" max-h-96" src={URL.createObjectURL(form.image)} />
        ) : null}
        <div className="w-full flex justify-between items-end mt-4 border-t-2 border-greyUL">
          <input
            onChange={(e: ChangeEvent) =>
              setForm((prev) => (prev = { ...form, image: e.target.files[0] }))
            }
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            hidden
          />
          <FontAwesomeIcon
            className="text-greyL hover:text-primary duration-300 cursor-pointer"
            size="xl"
            icon={faImage}
            onClick={() => document.getElementById("image")?.click()}
          />
          <Button1 onClick={(e) => AddPost(e)} text="Publier" />
        </div>
      </form>
    </div>
  );
}
