import { Schema, model } from "mongoose";
import { Car } from "../interface/car.interface";

/**
 * Es Squema: es la representación de las propiedas que se van
 * a guardar en la base de datos.
 */

const ArticleSchema = new Schema<Car>(
    {
        color:{
            type:String,
            required:true
        },
        modelo:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        marca:{
            type:String,
            required:true
        },
        gas:{
            type:String,
            enum:["gasoline", "electric"],
            required:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

/**
 * El model: es el nombre de la colección
 */
const ArticleModel = model("articulos", ArticleSchema)

export default ArticleModel