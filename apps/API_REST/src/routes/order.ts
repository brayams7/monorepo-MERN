//MANEJADOR DE RUTAS (GET, POST, PUT, PATCH)
import {Router} from 'express'
import { listOrdersController } from '../controllers/orders.controller'
import { checkJwtMiddleware } from '../middleware/session'
const router = Router({caseSensitive:true})

/**
 * http://localhost:3001/order/list [POST]
 * solo pueden acceder las personas que tengan una sesión activa: (jwt válido)
 */
router.get('/',checkJwtMiddleware, listOrdersController)

export {router}