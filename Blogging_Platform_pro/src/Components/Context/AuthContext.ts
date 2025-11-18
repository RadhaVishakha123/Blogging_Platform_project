import { useContext } from "react";
import { createContext } from "react";
import type{ UserAuthContext,User } from "../Helper/Type";

export const AuthContext=createContext<UserAuthContext>({
    Userdata:[],
        AddUser:(data:Omit<User, "Id">)=>false,
        FetchProflile:(Email:string,Password:string)=>null,
        isModalOpen:false,
     setIsModalOpen:( value: boolean ) => {},
     isslideOpen:false,
      setIsSlideOpen:( value: boolean ) => {},
      imageFile:"",
       setImageFile:( value: any ) => {},
       CurrentUser:null,
        setCurrentUser:( value: User|null ) => {} ,
         activeAction:"",
         setActiveAction:( value: string ) => {}
       
})
export const AuthContextProvider=AuthContext.Provider;
export default function useAuth(){
   return( useContext(AuthContext)); 
}