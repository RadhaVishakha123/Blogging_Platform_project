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