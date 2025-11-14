export interface User{
    Id:string;
    Username:string;
    Email:string;
    Password:string
}
export interface UserAuthContext{
    Userdata:User[];
    AddUser:(data:Omit<User, "Id">)=>boolean;
    FetchProflile:(Email:string,Password:string)=>User|null
}