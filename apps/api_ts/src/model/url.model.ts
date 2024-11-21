import { Schema, model } from "mongoose";
import { UrlInterface } from "../interfaces/url.interface"; 
import { nanoid } from 'nanoid'
/**
 * Es Squema: es la representación de las propiedas que se van
 * a guardar en la base de datos.
 */

const NoteSchema = new Schema<UrlInterface>(
    {
        origin:{
            type:String,
            required:true
        },
        shortUrl:{
            type:String,
            required:true,
            unique:true,
            default: nanoid(6)
        }
    },
    {
        versionKey:false,
        timestamps:true
    }
)

/**
 * El model: es el nombre de la colección
 */
const NoteModel = model("notes", NoteSchema)

export default NoteModel