import { useContext } from "react";
import { createContext } from "react";
import type{ UserAuthContext } from "../Helper/Type";

export const AuthContext=createContext<UserAuthContext>({
    Userdata:[],
        AddUser:()=>false,
        FetchProflile:()=>null,
        isModalOpen:false,
     setIsModalOpen:(  ) => {},
     isslideOpen:false,
      setIsSlideOpen:(  ) => {},
      imageFile:"",
       setImageFile:( ) => {},
       CurrentUser:null,
        setCurrentUser:(  ) => {} ,
         activeAction:"",
         setActiveAction:(  ) => {}
       
})
export const AuthContextProvider=AuthContext.Provider;
export default function useAuth(){
   return( useContext(AuthContext)); 
}