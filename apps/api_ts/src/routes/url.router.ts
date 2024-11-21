import { Router } from "express";
import { getListUrls } from "../controllers/url.controller";

const router =  Router()

router.get('/', getListUrls)

export {
    router
}