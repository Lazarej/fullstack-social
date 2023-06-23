import UserAvatar from "@/components/userAvatar/userAvatar";
import { AuthContext } from "@/context/auth";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MessageForm from "@/components/messageForm/messageForm";

export default function Chat() {
  const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const user = useContext(AuthContext)

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/chats`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setChats((prev) => (prev = res.data.chats));
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async (i: number) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/messages/${i}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setMessages((prev) => (prev = res.data.messages));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex">
      <div
        className="h-full overflow-hidden w-[500px]  overflow-y-scroll"
        style={{ direction: "rtl" }}
      >
        <div className=" border-r-2 border-r-greyUL flex flex-col items-center px-3">
          {chats.map((chat, index) => (
            <div
              onClick={() => getMessages(chat.id)}
              className="w-full h-24  py-3 cursor-pointer border-b-[1px] border-greyL"
              key={index}
            >
              <div
                className="w-full h-full rounded-sm flex items-center "
                style={{ direction: "ltr" }}
              >
                <div className="h-[70px] w-[70px] mx-3">
                  <UserAvatar
                    change={false}
                    img={chat.filteredMembers[0].avatar}
                  />
                </div>
                <div className="h-full">
                  <h4 className="font-monumentR text-sm">
                    {chat.filteredMembers[0].name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="w-full  px-10">
          {messages.map((message, index) => (
          <div key={index} style={message.userId === user.auth.id ? {   direction: "ltr"}   :  { direction: "rtl"  } }>
                <p>{message.text}</p>
          </div>
        ))}
        </div>
        <MessageForm/>
      </div>
    </div>
  );
}
