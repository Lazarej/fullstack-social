import axios from "axios";
import { useRouter } from "next/router";
import { useState, createContext, PropsWithChildren, useEffect } from "react";

interface User {
  id: number | null;
}
export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<User>({
    id: null,
  });
  const router = useRouter();

  useEffect(() => {
    RefresHToken();
    const interval = setInterval(() => RefresHToken(), 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const RefresHToken = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/refreshToken`,
        {
          withCredentials: true,
        }
      );
      const user = JSON.parse(localStorage.getItem("Test2") as string);
      setAuth((prev) => (prev = { ...user }));
    } catch (error: any) {
      if (error.response.status === 401) {
        Logout();
      }
    }
  };

  const saveUser = (data: {id: number}) => {
    localStorage.setItem("Test2", JSON.stringify(data));
    setAuth((prev) => (prev = { ...data}));
  }

  const Login = async (form: { email: string; password: string }, e: Event) => {
    const key = (e as KeyboardEvent).key === "Enter";
    const click = (e as MouseEvent).type === "click";
    if (key || click) {
      e.preventDefault();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN}api/auth/login`,
          form,
          {
            withCredentials: true,
          }
        );
        saveUser({...response.data.data })
        router.push("/");
      } catch (error) {
        console.error("dza", error);
      }
    }
  };

  const Register = async (
    form: { email: string; password: string },
    e: Event
  ) => {
    const key = (e as KeyboardEvent).key === "Enter";
    const click = (e as MouseEvent).type === "click";
    if (key || click) {
      e.preventDefault();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN}api/auth/register`,
          form,
          { withCredentials: true }
        );
        saveUser({...response.data.data })
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const Logout = async (e?: Event) => {
    if (e) return e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}api/auth/logout`,
        { withCredentials: true }
      );
      console.log(response);
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    auth,
    Login,
    Logout,
    Register,
    saveUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
