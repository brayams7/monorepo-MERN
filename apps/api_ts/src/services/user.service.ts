import { ResponseClass } from "../class/ResonseClass"
import { ResponseInterface } from "../interfaces/response.interface"
import UserModel from "../model/user.model"

const getUserService = async (id:string | undefined) : Promise<ResponseInterface>=>{
    const user = await UserModel.findById(id)

    if(!user){
        return new ResponseClass(404,{},"El usuario no existe").getResponseData()
    }

    const dataResponse = new ResponseClass(200,{user},"OK").getResponseData()

    return dataResponse
}

export {
    getUserService
}