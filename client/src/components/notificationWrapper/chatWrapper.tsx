
import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import DropDown from "../dropdown/dropdown"
import axios from "axios"
import Link from "next/link"



export default function ChatWrapper(props:any) {
    
    const [state, setState] = useState(false)
    const [notif, setNotif] = useState([])
    
      useEffect(() => {
        //   getFriendsNotif()
           
    },[])


    const getFriendsNotif =  async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/notification?type=friend`,{
                withCredentials: true,
            })
           setNotif(res.data.friendsNotification)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="relative h-full flex flex-col justify-end mr-6">
            <Link href={'/chat'}>
                 <FontAwesomeIcon icon={faMessage} onClick={() => setState(prev => prev = !prev)} className=" mb-1 cursor-pointer" size="lg" />
           </Link>
            {notif.length > 0 && <DropDown open={state} data={notif} />}
        </div>
    )
}