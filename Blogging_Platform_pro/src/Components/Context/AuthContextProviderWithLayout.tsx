import { useEffect, useState } from "react";
import { AuthContextProvider } from "./AuthContext";
import type { User } from "../Helper/Type";
import { nanoid } from "nanoid";
import { App } from "antd";
export default function AuthContextProviderWithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { message } = App.useApp();
  const [Userdata, setUserData] = useState<User[]>(() => {
    return JSON.parse(localStorage.getItem("Userdata") ?? "[]") || [];
  });
  const [CurrentUser, setCurrentUser] = useState<User | null>(()=>{
      return JSON.parse(localStorage.getItem("CurrentUser") ?? "null") || null
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isslideOpen, setIsSlideOpen] = useState(false);
    const [imageFile, setImageFile] = useState<any>(null);
    const [activeAction,setActiveAction]=useState<string>("Home");
  function AddUser(data: Omit<User, "Id">) {
    const id = nanoid(10);
    const found = Userdata.some(
      (user) =>
        user.Email.trim().toLowerCase() == data.Email.trim().toLowerCase() ||
        user.Username.trim().toLowerCase() == data.Username.trim().toLowerCase()
    );
    
    if (found) {//Alert is work in react return() not in function,and message is work in function and aslo in return()
   message.error("User with this email or username already exists");
      return false;
    } else {
      setUserData((pre) => [{ Id: id, ...data }, ...pre]);
      message.success("Registration successful! Please log in.");
      return true;
    }
  }
  function FetchProflile(Email: string, Password: string) {
    const user = Userdata.find((User)=> User.Email===Email && User.Password===Password);
    if(!user){
      message.error("Invalid email or password");
      return null;
    }
    setCurrentUser(user);
    return user;
    
  }
  useEffect(()=>{
    localStorage.setItem("Userdata",JSON.stringify(Userdata));
  },[Userdata])
  useEffect(()=>{
    localStorage.setItem("CurrentUser",JSON.stringify(CurrentUser));
  },[CurrentUser])
  return (
    <>
      <AuthContextProvider value={{ Userdata, AddUser, FetchProflile,isModalOpen,
     setIsModalOpen,
     isslideOpen,
      setIsSlideOpen,
      imageFile,
       setImageFile,CurrentUser, setCurrentUser, activeAction,
         setActiveAction }}>
        {children}
      </AuthContextProvider>
    </>
  );
}
