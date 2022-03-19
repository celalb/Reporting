import { User } from './user';

export interface Usergroup {
    id:number;
    name:string;
    usercount:number;
    users:Array<User>;
    
}

