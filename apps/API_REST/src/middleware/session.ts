import { NextFunction, Response } from "express"
import { TokenValidInterface } from "../interface/jwt/tokenValid.interface"
import { RequestExtend } from "../interface/request/requestExtended.interface"
import { handleHTTP } from "../utils/error.handle"
import { verifyToken } from "../utils/jwt.handle"



const checkJwtMiddleware = (req:RequestExtend, res:Response, next:NextFunction)=>{
    try {
        const authorization = req.headers.authorization || ''
        const jwt = authorization.split(' ')[1]

        const isOk:TokenValidInterface = verifyToken(jwt)

        if(isOk.isError){
            return handleHTTP(res, isOk.message, 401)
        }
        req.user = isOk.payload
        next()
    } catch (error) {
        return handleHTTP(res, "SESIÓN INVÁLIDA", 500)
    }
}

export {
    checkJwtMiddleware
}