import { Request, Response } from "express"
import { getArticleService, getArticlesService, insertArticleService, updateArticleService } from "../services/articulo.service"
import { handleHTTP } from "../utils/error.handle"

//Solo se encarga de el request y de responder.
const getArticulo = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const response = await getArticleService(id)
        const data = response ? response : "No existe el articulo"
        return res.json({
            message:"OK",
            data
        }) 
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}

const getArticulosController = async (_:Request, res:Response)=>{
    try {
        const listArticulos = await getArticlesService()
        return res.json({
            message:"OK",
            list: listArticulos
        }) 
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}

const updateArticulos = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const body = req.body
        const response = await updateArticleService(id, body)
        return res.json({
            message:"OK",
            data: response
        }) 
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}

const postArticulos = async (req:Request, res:Response)=>{
    try {
        const { body } = req
        const responseItem = await insertArticleService(body)
        res.json(responseItem)
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}

const deleteArticulos = (_:Request, res:Response)=>{
    try {
        
    } catch (error) {
        return handleHTTP(res, "ERROR EN EL SERVIDOR")
    }
}

export {
    getArticulo,
    getArticulosController,
    updateArticulos,
    postArticulos,
    deleteArticulos
}