//Config para que nuestro proyecto empiece aplicar la configuración de las variables de entorno.
import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { router } from "./routes"
import handleConectionDB from "./config/conectionDB"

//DB MONGO
// import db from './config/mongo'

//ROUTES
// import {router} from './routes'

const PORT = process.env.PORT || 3001 


const app = express()

//MIDDLEWARE
app.use(cors()) //config de los cors
app.use(morgan('dev'))

app.use(express.json())
app.use(router)

handleConectionDB()

app.listen(PORT, ()=>console.log('Listo por el puerto ' + PORT))