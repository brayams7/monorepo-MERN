import { Car } from "../interface/car.interface"
import ArticleModel from "../models/article"

//Encarfado de la lógica de negocio
// encargado de interactuar con la db.

const insertArticleService = async (article:Car)=>{
    const responseInsert = await ArticleModel.create(article)
    return responseInsert
}

const getArticlesService = async ()=>{
    return await ArticleModel.find({})
}

const getArticleService = async (id:string)=>{
    const article = await ArticleModel.findOne({_id:id})
    return article 
}

const updateArticleService = async (id:string, data:Car)=>{
    return await ArticleModel.findOneAndUpdate(
        {_id:id},
        data,
        {
            new:true
        },
        // ( err,doc, res)=>{
        //     console.log({err, doc, res})

        //     if(!err) return doc
        //     return {
        //         error:"No se encontró el documento",
        //     }
        // }
    )
}

const deleteArticleService = async (id:string)=>{
    return await ArticleModel.findOne({_id:id})
}

export {
    insertArticleService,
    getArticleService,
    getArticlesService,
    deleteArticleService,
    updateArticleService
}