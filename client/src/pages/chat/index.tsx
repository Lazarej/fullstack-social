import axios from "axios"
import { useEffect, useState } from "react"



export default function Chat() {

    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
       getChats()
    },[])

    const getChats = async () => {
        try {
           const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/chats`,   {
          withCredentials: true,
           }) 
            console.log(res.data)
            setChats(prev => prev = res.data.chats)
        } catch (error) {
            console.error(error)
        }
    }

    const getMessages = async (i: number) => {
        try {
             const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/messages/${i}`,   {
          withCredentials: true,
           }) 
            console.log(res.data)
            setMessages(prev => prev = res.data.messages)
        } catch (error) {
              console.error(error)
        }
    }
    
    return (
        <div className="w-full h-[100vh] flex">
            <div className="h-full overflow-hidden w-[500px]  overflow-y-scroll"  style={{ direction:"rtl" }}>
                 <div className=" border-r-2 border-r-greyUL flex flex-col items-center">
                {
                    chats.map((chat, index) => (
                        <div onClick={() => getMessages(chat.id)} className="w-full h-24  p-3 cursor-pointer" key={index}>
                            <div className="w-full h-full bg-primary rounded-sm">
                                <p>{ chat.id}</p>
                            </div>

                        </div>
                    ))
                 }
            </div>
           </div>
            <div className="h-full w-full">
                {
                    messages.map((message,index)=>(
                <div key={index}>
                            <p>{ message.text}</p>
                </div>
                    ))
                  }
            </div>

        </div>
    )
}