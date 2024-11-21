import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper";

export const craeteUserValidator = [
    check('email', "Ingrese un email válido")
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail(),

    check('username', "Ingrese un username valido")
        .exists()
        .trim()
        .not()
        .isEmpty(),
    
    check('firstName', "el Nombre es requerido")
        .exists()
        .trim()
        .not()
        .isEmpty(),

    check('lastName', "el Nombre es requerido")
        .exists()
        .trim()
        .not()
        .isEmpty(),

    check('password', "La contraseña es incorrecta")
        .exists()
        .trim()
        .not()
        .isEmpty()
        .isLength({min:8})
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .custom((input:string, {req})=>{
            if(input !== req.body.confirmPassword) throw new Error('Las contraseñas no coiciden')
            return true
        }),
    
    check('phone', "El número de telefono es requerido")
        .exists()
        .trim()
        .not()
        .isEmpty()
        .custom((input:string,_)=>{
            console.log({input})
            const r = new RegExp(/^\d{3}-\d{3}-\d{4}$|^\(\d{3}\) \d{4} \d{4}$/)
            console.log(r.test(input))
            if(!r.test(input)) throw new Error('El número de telefono debe ser: (502) 12345687')
            return true
        }),
    (req:Request, res:Response, next:NextFunction)=>{

        validateResult(req,res,next)
    }
]

export const loginUserValidator = [
    check('email', "Ingrese un email válido")
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .normalizeEmail(),

    check('password', "La contraseña es incorrecta")
        .exists()
        .trim()
        .not()
        .isEmpty()
        .isLength({min:8})
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    
    (req:Request, res:Response, next:NextFunction)=>{

        validateResult(req,res,next)
    }
]