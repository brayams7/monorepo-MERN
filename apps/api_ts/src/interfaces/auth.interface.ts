export interface Auth{
    email:string,
    password:string
}

export interface User extends Auth{
    username:string
    firstName:string,
    lastName:string,
    contact:Contact,
}

export interface Contact{
    phone:String,
    email:String | undefined | null
}