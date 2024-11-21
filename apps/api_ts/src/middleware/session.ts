import { NextFunction, Response } from "express"
import { TokenValidInterface } from "../interfaces/jwt/tokenValid.interface"
import { RequestExtend } from "../interfaces/request/requestExtended.interface"
import { handleHTTP } from "../utils/error.handle"
import { verifyToken } from "../utils/jwt.handle"

const JWT_SECRET = process.env.JWT_SECRET || "Secreto2022"

const checkJwtMiddleware = (req:RequestExtend, res:Response, next:NextFunction)=>{
    try {
        const authorization = req.headers.authorization || ''
        const jwt = authorization.split(' ')[1]

        const isOk:TokenValidInterface = verifyToken(jwt, JWT_SECRET)

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