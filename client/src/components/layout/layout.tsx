import { ReactElement } from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";


export default function ({children}: any) {
    
    return (
        
        <div className="flex flex-col fixed">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                {children}
               </div>
            </div>
            
        
    )
}