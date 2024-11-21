import {Router} from 'express'
import {readdirSync} from 'fs'

const PATH_ROUTER = `${__dirname}`
const INDEX = 'index'
const router = Router()

const cleanFileName = (fileName:string)=>{
    return fileName.split('.').shift()   
}

/**
 * Permite escanear los diferentes archivos en en directorio routes
 */
readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName = cleanFileName(fileName)
    if(cleanName !== INDEX){
        import(`./${cleanName}`).then((moduleRouter)=>{
            console.log('Cargando la ruta... /'+ cleanName)
            router.use(`/${cleanName}`, moduleRouter.router)
        })
    }
})

export {router}

