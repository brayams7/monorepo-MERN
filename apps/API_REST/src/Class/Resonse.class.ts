import { Response } from "../interface/response.interface";

class ResponseClass implements Response{
    code:number;
    message:any;
    data:object;

    constructor(code:number, message:any, data:object){
        this.code = code
        this.message=message || ""
        this.data=data
    }

    getResponseData() : Response{
        return {
            code:this.code,
            message:this.message,
            data: this.data
        }
    }
}

export {
    ResponseClass
}