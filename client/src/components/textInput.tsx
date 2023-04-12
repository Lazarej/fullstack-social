import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface Props {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler;
  error?: string;
}

export default function TextInput(props: Props) {
  return (
    <div className="flex flex-col">
      <label className="uppercase font-robotoR">{props.label}</label>
      <input
        className="mb-4 p-2 rounded-sm h-10 max-w-[400px] caret-primary"
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <small>{props.error}</small>
    </div>
  );
}
