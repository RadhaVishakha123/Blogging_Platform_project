//User registration and authentication types
export interface User{
    Id:string;
    Username:string;
    Email:string;
    Password:string
}
export interface UserAuthContext{
    Userdata:User[];
    AddUser:(data:Omit<User, "Id">)=>boolean;
    FetchProflile:(Email:string,Password:string)=>User|null;
    isModalOpen:boolean;
     setIsModalOpen:( value: boolean ) => void;
     isslideOpen:boolean;
      setIsSlideOpen:( value: boolean ) => void;
      imageFile:any;
       setImageFile:( value: any ) => void;
       CurrentUser:User|null;
        setCurrentUser:( value: User|null ) => void;
}
//user profile types
export interface UserProfile{
    userId: string;
    username: string;
    fullName: string;
    bio: string;
    profilePic: string;
    accountType: "public" | "private"; 
}
export interface UserPost
{
    postId: string;
    userId: string;
    content: string;
    imageUrl?: string;
    createdAt: Date;
}
export interface UserPostcomment_like{
    postId:string;
    UserId:string;
    comments: { userId: string; comment: string; }[];
    likes: string[]; // Array of userIds who liked the post
}
export interface Userfollow{
    userId: string;
    followers: string[]; // Array of userIds who follow this user
    following: string[]; // Array of userIds whom this user follows
}
export interface UserProfileContextType{
    UserProfiledata:UserProfile[];
    UserPostdata?:UserPost[];
    UserPostcomment_likedata?:UserPostcomment_like[];
    Userfollowdata?:Userfollow[];   
    AddUserProfile:(data:Omit<UserProfile, "userId">)=>boolean;
    FetchProfliledata:(userId:string)=>UserProfile|undefined;  
    isProfilemodelOpen:boolean;
    setisProfilemodelOpen:(value:boolean)=>void;
    //post add
    AddPost:(data:Omit<UserPost, "postId" | "createdAt">)=>boolean;
    FetchUserPosts(userId: string): UserPost[]

}