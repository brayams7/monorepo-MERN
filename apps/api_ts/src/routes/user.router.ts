import { Router } from "express";
import { createUserController, getUserInfoController, loginUserController, refreshTokenController } from "../controllers/auth.controller";
import { checkJwtMiddleware } from "../middleware/session";
import { craeteUserValidator, loginUserValidator } from "../validators/auth.validator";

const router =  Router()

router.post('/', craeteUserValidator, createUserController)

router.post('/login', loginUserValidator, loginUserController)

router.get('/refreshToken', refreshTokenController)

//Private routes

router.get('/:id', checkJwtMiddleware, getUserInfoController)

export {
    router
}