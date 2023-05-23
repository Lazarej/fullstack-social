import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
 
const DropDownSearch = dynamic(() => import('../dropDownSearch/dropDownSearch'), {
  loading: () => <p>Loading...</p>,
  ssr:false
});
export default function Searchbar() {


  const [searchResult, setSearchResult] = useState([])


  const Search = async (e: ChangeEvent<HTMLInputElement>) => {
    
         try {
           const res = await axios.get(`http://localhost:8800/api/user?name=${e.target.value}&limit=10`,       {
            withCredentials: true,
           })
           if (e.target.value.length === 0) {
             setSearchResult(prev => prev = [])
           }
           console.log(res.data.targets.rows)
           setSearchResult(prev => prev = res.data.targets.rows)
         } catch (error) {
          
         }
  }

  return (
    <div className="flex flex-col relative w-96 h-10">
      <div className="w-96 border-2 pl-2  h-10 rounded-full border-greyUL bg-white flex items-center absolute z-10 top-0">
        <FontAwesomeIcon
          className="mr-3"
          icon={faMagnifyingGlass}
          size="sm"
          style={{ color: "#000" }}
        />
        <input
          id="search"
          type="text"
          onChange={(e) => Search(e)}
          placeholder="Recherche"
          className="w-full h-full rounded-full pl-1 "
        />
      </div>
          <DropDownSearch result={...searchResult} />
    </div>
  );
}
