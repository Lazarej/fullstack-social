import axios from "axios";
import { useRouter } from "next/router";
import {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";

interface User {
  name: string
  email: string;
}

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<User>({
    name:'',
    email: '',
  });
  const router = useRouter()

  useEffect(() => {
    const connected = localStorage.getItem('Test2');
    if (connected) {
      console.log(connected)
      const storage = JSON.parse(connected)
      setAuth(storage)
    } else {
      router.push("/login")
    }
  },[])


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
        setAuth((prev) => (prev = { ...response.data.data }));
        localStorage.setItem('Test2', JSON.stringify(response.data.data))
        router.push("/")
      } catch (error) {
        console.error('dza',error);
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
        console.log(response.data);
        setAuth((prev) => (prev = {  ...response.data.data }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const value = {
    auth,
    Login,
    Register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


