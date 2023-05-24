import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import DropDown from "../dropdown/dropdown"
import axios from "axios"



export default function FriendWrapper(props:any) {
    
    const [state, setState] = useState(false)
    const [notif, setNotif] = useState([])
    
      useEffect(() => {
          getFriendsNotif()

    },[])


    const getFriendsNotif =  async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/notification/friend`,{
                withCredentials: true,
            })
            console.log(res.data)
           setNotif(res.data.friendsNotification)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="relative h-full flex flex-col justify-end mr-6">
            <FontAwesomeIcon icon={faUser} onClick={() => setState(prev => prev = !prev)} className=" mb-1 cursor-pointer" size="lg" />
            {notif.length > 0 && <DropDown open={state} data={notif} />}
        </div>
    )
}