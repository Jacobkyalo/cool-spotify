"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";
import { account } from "@/appwrite.config";
import { toast } from "react-toastify";
import { UserProps } from "./definitions";

export interface AuthContextProps {
  user: UserProps;
  loading: false;
  signupUser: (email: string, password: string, name: string) => {};
  loginUser: (email: string, password: string) => {};
  logoutUser: () => void;
  // createPasswordRecovery: (email: string) => {};
  // updatePasswordRecovery: (
  //   userId: string,
  //   secret: string,
  //   password: string,
  //   passwordAgain: string
  // ) => {};
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserProps | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signupUser = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      await account.create(ID.unique(), email, password, name);
      setLoading(false);
      await account.createEmailPasswordSession(email, password);

      let accountDetails: UserProps = await account.get();
      setUser(accountDetails);

      toast.success("Success: Account created successfully");
      router.push("/");
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      await account.createEmailPasswordSession(email, password);
      setLoading(false);

      let accountDetails = await account.get();
      setUser(accountDetails);

      toast.success("Success: Login successful");

      router.push("/");
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setLoading(false);
      localStorage.removeItem("cookieFallback");
      setUser(undefined); // Pass an empty value as an argument to setUser

      toast.success("Success: Logout successful");

      router.push("/login");
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const persistUser = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong: " + error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cookieFallback")) {
      persistUser();
    }
  }, []);

  const values: any = {
    user,
    loading,
    signupUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
