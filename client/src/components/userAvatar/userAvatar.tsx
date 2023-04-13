
interface Props{
    img?: string,
    change: boolean
}

export default function UserAvatar(props: Props) {
    
    return (
        <img src={props.img ? props.img :'images/default-avatar.png' } className="w-full h-full rounded-full">

        </img>
    )
}