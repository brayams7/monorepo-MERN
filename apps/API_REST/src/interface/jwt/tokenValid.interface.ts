export interface TokenValidInterface{
    isError:boolean,
    message:string,
    payload:PayloadInterface | null
}

export interface PayloadInterface{
    id:string,
    iat:number,
    exp:number
}