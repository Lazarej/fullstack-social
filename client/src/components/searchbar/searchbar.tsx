import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Searchbar() {
    
    return (
       <div className="flex flex-col relative w-96 h-10">
             <div className="w-96 border-2 pl-2  h-10 rounded-full border-greyUL bg-white flex items-center absolute z-10 top-0">
            <FontAwesomeIcon className="mr-3" icon={faMagnifyingGlass} size="sm"
          style={{ color: "#000" }} />
            <input type="text" placeholder="Recherche" className="w-full h-full rounded-full " />
           
            </div>
                    <div className="bg-white h-52 w-full absolute top-2/4"></div>
       </div>
 
    )
}