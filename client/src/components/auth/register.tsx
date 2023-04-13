import { ChangeEvent, useContext, useState } from "react";
import TextInput from "../textInput";
import { AuthContext } from "@/context/auth";
import Button1 from "../button";

export default function RegisterForm() {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordBis: "",
  });

  const HandleEvent = (e: ChangeEvent) => {
    const result: string = (e.target as HTMLInputElement).value;
    const inputName = (e.target as HTMLInputElement).name;
    setForm((prev) => (prev = { ...form, [inputName]: result }));
  };

  return (
    <form
      className="flex flex-col w-full h-full justify-center"
      onKeyDown={(e) => authContext.Register(form, e)}
    >
      <h2 className="mb-8">Register</h2>
      <TextInput
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        onChange={(e) => HandleEvent(e)}
      />
      <TextInput
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        onChange={(e) => HandleEvent(e)}
      />
      <TextInput
        name="passwordBis"
        type="password"
        placeholder="Repeat password"
        label="Repeat password"
        onChange={(e) => HandleEvent(e)}
      />
      <Button1 onClick={(e) => authContext.Register(form, e)} text="Register" />
    </form>
  );
}
