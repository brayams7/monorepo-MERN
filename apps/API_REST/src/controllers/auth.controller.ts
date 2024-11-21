import { Request, Response } from "express"
import {
  loginUserService,
  registerNewUserService,
} from "../services/auth.service"

export const registerController = async (req: Request, res: Response) => {
  const body = req.body
  const regiterUser = await registerNewUserService(body)
  return res.json(regiterUser)
}

export const loginController = async (req: Request, res: Response) => {
  const body = req.body
  const dataResponse = await loginUserService(body)
  return dataResponse?.code === 200
    ? res.json(dataResponse).status(200)
    : res.json(dataResponse).status(404)
}

export const greetYouController = (_req: Request, res: Response) => {
  return res.json({
    data: "Hola soy el controlador de auth",
  })
}
