import { useEffect, useState } from "react"
import DropDown from "../dropdown/dropdown"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons"



export default function ActuWrapper(props:any) {
    
    const [state, setState] = useState(false)
    const [notif, setNotif] = useState([])
    
      useEffect(() => {
          getNotif()
           
    },[])


    const getNotif =  async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}api/notification`,{
                withCredentials: true,
            })
            console.log('actu',res.data)
           setNotif(res.data.notification)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="relative h-full flex flex-col justify-end mr-6">
            <FontAwesomeIcon icon={faEarthEurope} onClick={() => setState(prev => prev = !prev)} className=" mb-1 cursor-pointer" size="lg" />
            {notif.length > 0 && <DropDown open={state} data={notif} />}
        </div>
    )
}