import axios from "axios";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8800')

export default function MessageForm(props: any) {
  const [chatValue, setChatValue] = useState("");

  const handleText = (value: string) => {
    setChatValue((prev) => (prev = value));
  };

  const postMessage = async (e: Event) => {
    const key = (e as KeyboardEvent).key === "Enter";
    const click = (e as MouseEvent).type === "click";
    if (!key) return;
    try {
      e.preventDefault();
      await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/message`,
        { text: chatValue, ChatId: props.ChatId },
        {
          withCredentials: true,
        }
        );
        socket.emit("send_message",chatValue)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" h-24 border-greyUL border-t-[1px]">
      <form
        action=""
        className="h-full w-full"
        onKeyDown={(e) => postMessage(e)}
      >
        <textarea
          onChange={(e) => handleText(e.target.value)}
          type="text"
          className="h-full w-full p-2 caret-primary resize-none"
          value={chatValue}
        />
      </form>
    </div>
  );
}
