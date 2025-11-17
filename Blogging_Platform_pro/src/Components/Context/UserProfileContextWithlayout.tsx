import { useEffect, useState } from "react";
import { UserProfileContextProvider } from "./UserProfileContext";
import type {
  UserProfile,
  UserPost,
  UserPostcomment_like,
  Userfollow ,
  UserProfileContextType,
} from "../Helper/Type";
import { nanoid } from "nanoid";
import useAuth from "./AuthContext";
import { App } from "antd";

export default function UserProfileContextWithlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { message } = App.useApp();
  const { CurrentUser } = useAuth();

  // --------------------------------------------
  // Load all data from localStorage on first load
  // --------------------------------------------
  const [UserProfiledata, setUserProfiledata] = useState<UserProfile[]>(() => {
    return JSON.parse(localStorage.getItem("UserProfiledata") ?? "[]");
  });

  const [UserPostdata, setUserPostdata] = useState<UserPost[]>(() => {
    return JSON.parse(localStorage.getItem("UserPostdata") ?? "[]");
  });

  const [UserPostcomment_likedata, setUserPostcomment_likedata] =
    useState<UserPostcomment_like[]>(() => {
      return JSON.parse(localStorage.getItem("UserPostcomment_likedata") ?? "[]");
    });

  const [Userfollowdata, setUserfollowdata] = useState<Userfollow[]>(() => {
    return JSON.parse(localStorage.getItem("Userfollowdata") ?? "[]");
  });
  const [isProfilemodelOpen, setisProfilemodelOpen] = useState(false);

  // ---------------------------
  // ADD USER PROFILE (only once)
  // ---------------------------
  function AddUserProfile(data: Omit<UserProfile, "userId">): boolean {
    const uid = CurrentUser?.Id;
    if (!uid) return false;
const newUser: UserProfile = {
      userId: uid,
      username: data.username,
      fullName: data.fullName,
      bio: data.bio,
      profilePic: data.profilePic,
      accountType: data.accountType,
    };
    const exists = UserProfiledata.some((u) => u.userId === uid);
    if (exists) {
    // UPDATE EXISTING PROFILE
    setUserProfiledata((prev) =>
      prev.map((u) => (u.userId === uid ? newUser : u))
    );
  } else {
    // ADD NEW USER PROFILE
    setUserProfiledata((prev) => [...prev, newUser]);
  }
    return true;
  }

  // ---------------------------
  // FETCH PROFILE
  // ---------------------------
  function FetchProfliledata(userId: string): UserProfile {
    const user = UserProfiledata.find((u) => u.userId === userId);

    if (!user) {
      return {
        userId,
        username: "",
        fullName: "",
        bio: "",
        profilePic: "",
        accountType: "public",
      };
    }
    return user;
  }
  //AddPost function 
    function AddPost(data: Omit<UserPost, "postId" | "createdAt">): boolean {
        const uid = CurrentUser?.Id;
        if (!uid) return false; 
        const postId = nanoid(10);
        const newPost: UserPost = {
            postId,
            userId: uid,
            content: data.content,
            imageUrl: data.imageUrl,
            createdAt: new Date(),
        };
        setUserPostdata((prev) => [newPost, ...prev]);
        message.success("Post added successfully!");
        return true;
    }
    function FetchUserPosts(userId: string): UserPost[] {
   return UserPostdata.filter(post => post.userId === userId);
}


  // --------------------------------------
  // Save all data to localStorage on change
  // --------------------------------------
  useEffect(() => {
    localStorage.setItem("UserProfiledata", JSON.stringify(UserProfiledata));
  }, [UserProfiledata]);

  useEffect(() => {
    localStorage.setItem("UserPostdata", JSON.stringify(UserPostdata));
  }, [UserPostdata]);

  useEffect(() => {
    localStorage.setItem(
      "UserPostcomment_likedata",
      JSON.stringify(UserPostcomment_likedata)
    );
  }, [UserPostcomment_likedata]);

  useEffect(() => {
    localStorage.setItem("Userfollowdata", JSON.stringify(Userfollowdata));
  }, [Userfollowdata]);

  return (
    <UserProfileContextProvider
      value={{
        UserProfiledata,
        UserPostdata,
        UserPostcomment_likedata,
        Userfollowdata,
        AddUserProfile,
        FetchProfliledata,
        isProfilemodelOpen,
    setisProfilemodelOpen,AddPost,FetchUserPosts
      }}
    >
      {children}
    </UserProfileContextProvider>
  );
}
