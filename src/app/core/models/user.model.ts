export interface UserLogin{
    identifier:string,
    password:string
}

export interface UserRegister{
    email:string,
    password:string,
    name:string,
    lastname:string
}

export interface User{
    uid:string;
    email:string;
    provider:string;
    token:string,
    name:string,
    lastname:string,
    picture: string,
}