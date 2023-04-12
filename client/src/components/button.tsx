import { MouseEventHandler } from "react"

interface Props{
    text: string,
    onClick: MouseEventHandler
}

export default function Button1(props: Props) {
    
    return (
        <button className="bg-primary text-white rounded-sm uppercase h-12 max-w-[400px] mt-8 font-robotoR" onClick={props.onClick}>{props.text}</button>
    )
}