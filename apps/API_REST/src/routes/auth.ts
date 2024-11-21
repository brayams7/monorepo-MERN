//MANEJADOR DE RUTAS (GET, POST, PUT, PATCH)
import {Router} from 'express'
import { greetYouController, loginController, registerController } from '../controllers/auth.controller'

const router = Router({caseSensitive:true})

/**
 * http://localhost:3001/auth/register [POST]
 */
router.post('/register', registerController)
router.post('/login', loginController)
router.get('/greet-you',greetYouController)

export {router}