import { useContext } from "react";
import { createContext } from "react";
import type{ UserAuthContext,User } from "../Helper/Type";

export const AuthContext=createContext<UserAuthContext>({
    Userdata:[],
        AddUser:(data:Omit<User, "Id">)=>false,
        FetchProflile:(Email:string,Password:string)=>null,
})
export const AuthContextProvider=AuthContext.Provider;
export default function useAuth(){
   return( useContext(AuthContext)); 
}