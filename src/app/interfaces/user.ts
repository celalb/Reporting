export interface User {
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    isActive:boolean;
    dateCreated:Date;
    dateUpdated:Date;
    fullName:string;
    typeId:number;
    groupId:number;
}

export interface LoginResponse{
   user:User;
   accessToken:string;
}

export interface UserLogin{
   username:string;
   password:string;
}
