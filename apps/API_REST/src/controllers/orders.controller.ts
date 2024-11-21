import { Response } from "express"
import { RequestExtend } from "../interface/request/requestExtended.interface"
import { handleHTTP } from "../utils/error.handle"

export const listOrdersController = async (req:RequestExtend, res:Response)=>{
    try {
        return res.json({
            data:"Esto solo lo vé las personas con sesión activa",
            user:req.user
        })
    } catch (error) {
        return handleHTTP(res,"Ocurrió un error en el servidor")
    }
}
