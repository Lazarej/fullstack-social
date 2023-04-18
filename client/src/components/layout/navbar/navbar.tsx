import Link from "next/link";


export default function Navbar() {
    
    return (
        <nav className="w-[100vw] h-16 border-b-2 border-greyUL flex justify-between">
            <div className=" w-2/6  h-full flex items-center">
                <h1 className="font-monumentR ml-10"> Jullius Social</h1>
            </div>
            <Link href={``} ></Link>
       </nav>
    )
}