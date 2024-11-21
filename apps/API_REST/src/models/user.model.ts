import { Schema, model } from "mongoose";
import { User } from "../interface/user.interface";

/**
 * Es Squema: es la representación de las propiedas que se van
 * a guardar en la base de datos.
 */

const UserSchema = new Schema<User>(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        description:{
            type:String,
            default:'Descripción'
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
const UserModel = model("users", UserSchema)

export default UserModel