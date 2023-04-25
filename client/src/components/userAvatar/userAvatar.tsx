interface Props {
  img: string | undefined;
  change: boolean;
}

export default function UserAvatar(props: Props) {
  return (
    <img
      src={
        props.img
          ? `${process.env.NEXT_PUBLIC_DOMAIN}${props.img}`
          : "/images/default-avatar.png"
      }
      className="w-full h-full rounded-full cursor-pointer"
    ></img>
  );
}
