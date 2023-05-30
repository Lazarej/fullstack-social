import { useEffect, useState } from "react";
import DropDown from "../dropdown/dropdown";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";

export default function ActuWrapper(props: any) {
  const [state, setState] = useState(false);
  const [notif, setNotif] = useState([]);
  const [isNewNotif, setIsNewNotif] = useState(false);

  useEffect(() => {
    getNotif();
  }, [state]);

  const getNotif = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/notification`,
        {
          withCredentials: true,
        }
      );
      const checkNewNotif = res.data.notification.every(
        (object: { open: boolean }) => {
          return object["open"] === true;
        }
      );
      setIsNewNotif((prev) => (prev = checkNewNotif));
      setNotif(res.data.notification);
    } catch (error) {
      console.error(error);
    }
  };

  const openDropDown = async () => {
    setState((prev) => (prev = !prev));
    notif.forEach(async (e: { open: boolean , id:number }) => {
      if (e.open === false) {
        try {
          const res = await axios.put(
            `${process.env.NEXT_PUBLIC_DOMAIN}api/notification/${e.id}`,
            { open: true },
            {
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="relative h-full flex flex-col justify-end mr-6">
      <FontAwesomeIcon
        icon={faEarthEurope}
        onClick={() => openDropDown()}
        className=" mb-1 cursor-pointer"
        size="lg"
      />
      {isNewNotif ? null : (
        <span className="h-2 w-2 bg-primary rounded absolute right-0"></span>
      )}
      {notif.length > 0 && <DropDown open={state} data={notif} />}
    </div>
  );
}
