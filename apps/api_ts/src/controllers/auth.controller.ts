import { Request, Response } from "express"
import { Auth, Contact, User } from "../interfaces/auth.interface"
import { RequestExtend } from "../interfaces/request/requestExtended.interface"
import { loginService, registerNewUserService } from "../services/auth.service"
import { getUserService } from "../services/user.service"
import { generateToken, verifyToken } from "../utils/jwt.handle"

const JWT_REFRESH = process.env.JWT_REFRESH || "secretRefresh2023"

//Solo se encarga de el request y de responder.
const createUserController = async (req:Request, res:Response) => {
    
    const contact : Contact = {
        phone:req.body.phone,
        email:req.body.email
    }

    const user : User = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        email:req.body.email,
        username:req.body.username,
        contact
    }

    const responseInterface = await registerNewUserService(user)

    return res.json(responseInterface)
}

const loginUserController = async (req:Request, res:Response) => {
    const body = req.body
    const auth: Auth = {
        email:body.email,
        password:body.password
    }

    const response = await loginService(auth)
    const refreshToken = String(response.extra)
    
    if(refreshToken){
        res.cookie("refreshToken", refreshToken,{
            httpOnly:true,
            secure: !(process.env.MODO === 'develop')
        })
    }
    
    return res.json(response)
}


const refreshTokenController = (req:Request, res:Response)=>{
    const cookieRefreshToken = req.cookies.refreshToken
    if(!(cookieRefreshToken !== "" && typeof cookieRefreshToken === "string")){
        return res.json({
            code:401,
            message:"NO autorizado",
            data:null
        }).status(401)        
    }
    const verifyT = verifyToken(cookieRefreshToken, JWT_REFRESH)
    const id = verifyT.payload?.id
    if(id === undefined){
        return res.json({
            code:404,
            message:"NO autorizado",
            data:null
        }).status(401)
    }
    const token = generateToken(id)
    return res.json(token)
}

const getUserInfoController = async (req:RequestExtend, res:Response) => {

    const response = await getUserService(req.user?.id)
    
    return res.json({
        response
    })
} 

export {
    createUserController,
    loginUserController,
    getUserInfoController,
    refreshTokenController
}