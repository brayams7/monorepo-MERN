import { ResponseClass } from "../class/ResonseClass"
import { Auth, User } from "../interfaces/auth.interface"
import { ResponseInterface } from "../interfaces/response.interface"
import UserModel from "../model/user.model"
import { verified } from "../utils/bcrypt.handle"
import { generateRefreshToken, generateToken } from "../utils/jwt.handle"

const registerNewUserService = async (user:User): Promise<ResponseInterface>=>{
    const isExistUser = await UserModel.findByUsernameOrEmail(user.username, user.email)
    
    if(isExistUser){
        return new ResponseClass(404,{},"El usuario ya existe").getResponseData()
    }

    const response = new ResponseClass(200,null)
    try {
    
        const newUser = await UserModel.create(user)
        response.setCode(200)
        response.setMessage("ok")
        response.setData(newUser)
        return response.getResponseData()
    } catch (error) {
        console.log("error", error)
        response.setCode(500)
        response.setMessage("Ocurrió un error al guardar el registro")
        response.setData(null)
        return response.getResponseData()
    }
}


const loginService = async (auth:Auth) : Promise<ResponseInterface>=>{
    const isExistUser = await UserModel.findOne(
        {
            email:auth.email
        }
    )
    if(!isExistUser){
        return new ResponseClass(404,{},"El usuario no existe").getResponseData()
    }

    const isValid = await verified(auth.password, isExistUser.password)
    if(!isValid){
        return new ResponseClass(404,{},"Credenciales incorrectas").getResponseData()
    }
    const token = generateToken(isExistUser.id) 
    const refreshToken = generateRefreshToken(isExistUser.id)

    const dataResponse = new ResponseClass(200,{
        username:isExistUser.username,
        token
    },"OK",
    refreshToken
    ).getResponseData()

    return dataResponse
}

export {
    registerNewUserService,
    loginService
}