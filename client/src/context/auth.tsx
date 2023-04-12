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
  email: string;
}

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<User>({
    email: "",
  });

  const IsUserAuth = (): boolean => {
    if (!auth.email) {
      return false;
    } else {
      return true;
    }
  };

  const Login = async (form: { email: string; password: string }, e: Event) => {
    const key = (e as KeyboardEvent).key === "Enter";
    const click = (e as MouseEvent).type === "click";
    if (key || click) {
      e.preventDefault();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN}auth/login`,
          form,
          {
            withCredentials: true,
          }
        );
        setAuth((prev) => (prev = { email: response.data.email }));
      } catch (error) {
        console.error(error);
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
          `${process.env.NEXT_PUBLIC_DOMAIN}auth/register`,
          form,
          { withCredentials: true }
        );
        console.log(response.data);
        setAuth((prev) => (prev = { email: response.data.email }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const value = {
    auth,
    IsUserAuth,
    Login,
    Register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.IsUserAuth();

  useEffect(() => {
    if (isLoggedIn && window.location.pathname !== "/") {
      router.push("/");
    } else if (!isLoggedIn && window.location.pathname === "/") {
      router.push("/login");
    }
  });

  return children;
};
