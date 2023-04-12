import LoginForm from "@/components/auth/login";
import RegisterForm from "@/components/auth/register";
import { useState } from "react";

export default function Login() {
  const [switchForm, setSwitchForm] = useState(false);

  return (
    <main className="flex min-h-screen pl-36">
      <div className="w-[400px] h-screen flex flex-col justify-center">
        {switchForm ? (
          <div className="flex flex-col items-center">
            <RegisterForm />
            <p className="mt-5">Pour vous connecter cliquez <span onClick={() => setSwitchForm(prev => prev = !prev)} className="text-primary font-bold">ici</span></p>
          </div>
        ) : (
          <div className="flex flex-col items-center ">
            <LoginForm /> <p className="mt-5">Pour s'inscrire cliquez <span onClick={() => setSwitchForm(prev => prev = !prev)} className="text-primary font-bold">ici</span></p>
          </div>
        )}
      </div>
    </main>
  );
}
