import { SearchContextProvider } from "./SearchContext";
import { useState } from "react";
import useAuth from "./AuthContext";
import useUserProfile from "./UserProfileContext";
import { useMemo } from "react";
import type { User, UserProfile } from "../Helper/Type";
export default function Searchcontextproviderwithlayout({
  children,
}: {
  children: React.ReactNode;
}){
    const {CurrentUser,Userdata}=useAuth();
    const {UserProfiledata}=useUserProfile();
    if(!CurrentUser)return;

   const[query, setQuery] = useState("");
    const mergedUsers = useMemo(() => {
    return Userdata.map((user: User) => {
      const profile: UserProfile | undefined = UserProfiledata.find(
        (p) => p.userId === user.Id
      );
      return {
        userId: user.Id,
        username: user.Username,
        fullName: profile?.fullName || "",
        profilePic: profile?.profilePic || "",
        bio: profile?.bio || "",
        accountType: profile?.accountType || "public",
      };
    });
  }, [Userdata, UserProfiledata]);

  // Search function
  function Searchdata(searchQuery: string) {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();

    return mergedUsers.filter((user) =>
      user.username.toLowerCase().includes(lowerQuery)
    );
  }

return(
    <SearchContextProvider value={{query,
    setQuery,
    Searchdata}}>
        {children}
        
    </SearchContextProvider>
)
}