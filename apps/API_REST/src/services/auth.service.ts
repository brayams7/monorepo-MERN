import { ResponseClass } from "../Class/Resonse.class"
import { Auth } from "../interface/auth.interface"
import { User } from "../interface/user.interface"
import UserModel from "../models/user.model"
import { encrypt, verified } from "../utils/bcrypt.handle"
import { generateToken } from "../utils/jwt.handle"

const registerNewUserService = async (user:User)=>{
    const isExistUser = await UserModel.findOne(
        {
            $or:[{username:user.username}, {email:user.email}]
        }
    )
    console.log(isExistUser)
    if(isExistUser){
        return new ResponseClass(404,"El usuario ya existe",{}).getResponseData()
    }
    const passHass = await encrypt(user.password)

    const newUser = await UserModel.create({
        ...user,
        password:passHass
    })
    const responseNewUser = new ResponseClass(200,"",newUser)
    return responseNewUser.getResponseData()
}

const loginUserService = async (auth:Auth)=>{
    const isExistUser = await UserModel.findOne(
        {
            email:auth.email
        }
    )
    if(!isExistUser){
        return new ResponseClass(404,"El usuario no existe",{}).getResponseData()
    }

    const isValid = await verified(auth.password, isExistUser.password)
    if(!isValid){
        return new ResponseClass(404,"Credenciales incorrectas",{}).getResponseData()
    }
    
    const token = generateToken(isExistUser.id)

    const dataResponse = new ResponseClass(200,"OK",{
        token,
        user:isExistUser
    }).getResponseData()
    return dataResponse
}

export {
    registerNewUserService,
    loginUserService
}