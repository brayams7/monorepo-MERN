import { NextFunction, Request, Response } from "express";

export const logMiddleware = (_req:Request, _res:Response, next:NextFunction) => {
    console.log('Hola soy el middleware')
    next()
}
