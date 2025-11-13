import { useEffect, useState } from "react";
import { AuthContextProvider } from "./AuthContext";
import Alert from "antd/es/alert/Alert";
import type { User } from "../Helper/Type";
import { nanoid } from "nanoid";
import { message } from "antd";
export default function AuthContextProviderWithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Userdata, setUserData] = useState<User[]>(() => {
    return JSON.parse(localStorage.getItem("Userdata") ?? "[]") || [];
  });
  function AddUser(data: Omit<User, "Id">) {
    const id = nanoid(10);
    const found = Userdata.some(
      (user) =>
        user.Email.trim().toLowerCase() == data.Email.trim().toLowerCase() ||
        user.Username.trim().toLowerCase() == data.Username.trim().toLowerCase()
    );
    if (found) {
      alert("⚠️ User already exists!");
      return false;
    } else {
      setUserData((pre) => [{ Id: id, ...data }, ...pre]);
      alert("✅ User registered successfully!");
      return true;
    }
  }
  function FetchProflile(Email: string, Password: string) {
    const user = Userdata.find((User)=> User.Email===Email && User.Password===Password);
    if(!user){
      message.error("Invalid email or password");
      return null;
    }
    return user;
  }
  useEffect(()=>{
    localStorage.setItem("Userdata",JSON.stringify(Userdata));
  },[Userdata])
  return (
    <>
      <AuthContextProvider value={{ Userdata, AddUser, FetchProflile }}>
        {children}
      </AuthContextProvider>
    </>
  );
}
