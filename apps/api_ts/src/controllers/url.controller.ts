import { Request, Response } from "express"
import { handleHTTP } from "../utils/error.handle"

//Solo se encarga de el request y de responder.
const getListUrls = async (_req:Request, res:Response)=>{
    try {
        return res.json({
            message:"OK",
            list:[
                {
                    origin:"https://edu.gcfglobal.org/es/crear-un-blog-en-internet/que-es-un-blog/1/",
                    shortUrl:"1kfsdfl"
                },
                {
                    origin:"https://edu.gcfglobal.org/es/crear-un-blog-en-internet/que-es-un-blog/1/",
                    shortUrl:"1kfsdf3"
                },
                {
                    origin:"https://edu.gcfglobal.org/es/crear-un-blog-en-internet/que-es-un-blog/1/",
                    shortUrl:"1kfsdf9"
                },
            ]
        }) 
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}



export {
    getListUrls
}