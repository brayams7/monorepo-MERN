import { Router } from "express";
import { getArticulosController } from "../controllers/article.controller";

const router = Router()

router.get('/', getArticulosController)

export {router}