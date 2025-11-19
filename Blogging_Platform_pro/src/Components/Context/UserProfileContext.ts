import { useContext } from "react";
import { createContext } from "react";
import type {
  
  UserProfileContextType,
  
} from "../Helper/Type";

export const UserProfileContext = createContext<UserProfileContextType>({
  UserProfiledata: [],
  UserPostdata: [],
  UserPostcomment_likedata: [],
  Userfollowdata: [],
  AddUserProfile: () => false,
  FetchProfliledata: () => undefined,
  isProfilemodelOpen: false,
  setisProfilemodelOpen: () => {},
  AddPost: () => false,
  FetchUserPosts: () => [],
  CheckIsFollowing: () => false,
  FollowUser: () => {},
  UnfollowUser: () => {},
});
export const UserProfileContextProvider = UserProfileContext.Provider;
export default function useUserProfile() {
  return useContext(UserProfileContext);
}
