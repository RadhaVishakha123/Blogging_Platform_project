import { useContext } from "react";
import { createContext } from "react";
import type{ UserProfile,UserProfileContextType,UserPost,UserPostcomment_like,Userfollow } from "../Helper/Type";



export const UserProfileContext=createContext<UserProfileContextType>({
    UserProfiledata:[],
     UserPostdata:[],
        UserPostcomment_likedata:[],
        Userfollowdata:[],
        AddUserProfile:(data:Omit<UserProfile, "userId">)=>false,
        FetchProfliledata:(userId) => undefined, 
        isProfilemodelOpen:false,
    setisProfilemodelOpen:(value:boolean)=>{},
    AddPost:(data:Omit<UserPost, "postId" | "createdAt">)=>false,
    FetchUserPosts:(userId: string) => [],
})
export const UserProfileContextProvider=UserProfileContext.Provider;
export default function useUserProfile(){
   return( useContext(UserProfileContext)); 
}