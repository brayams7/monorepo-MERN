//Config para que nuestro proyecto empiece aplicar la configuración de las variables de entorno.
import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"

//DB MONGO
import db from './config/mongo'

//ROUTES
import {router} from './routes'

const PORT = process.env.PORT || 3001 


const app = express()

//MIDDLEWARE
app.use(cors()) //config de los cors
app.use(morgan('dev'))

app.use(express.json())
app.use(router)
db().then(()=>console.log("Conección exitos"))
.catch((error)=>console.log(error) + "Error")
app.listen(PORT, ()=>console.log('Listo por el puerto ' + PORT))