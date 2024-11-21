import { Schema, model, Model} from "mongoose";
import { User } from "../interfaces/auth.interface";
import { encrypt } from "../utils/bcrypt.handle";

/**
 * Es Squema: es la representación de las propiedas que se van
 * a guardar en la base de datos.
 */

interface IUserModel extends Model<User> {
  findByUsernameOrEmail(username: string, email:string): Promise<User|null>
}

const UserSchema = new Schema<User, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      phone: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: false,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    // statics:{
    //   findByUsernameOrEmail(username: string, email:string) {
    //     return this.find({ $or:[{username: username},{email:email}] })
    //   }    
    // }
  }
)

UserSchema.static('findByUsernameOrEmail', function (username: string, email:string) {
  return this.findOne({ $or:[{username: username},{email:email}] })
          .then(user=> user)
          .catch(noExist=>noExist)
})


/**
 * Middleware: 
 * Son funciones que se ejecutan antes de que se ejecute un evento a nivel
 * de base de datos.
 * */

UserSchema.pre("save", async function(next) {
  if(!this.isModified('password')) return next()
  try {
    const passHass = await encrypt(this.password)
    this.password = passHass
    next()
  } catch (error) {
    console.log("Error en el hash de contraseña")
    throw new Error("Error en el hash de contraseñas")
  }
})


/**
 * El model: es el nombre de la colección
 */
const UserModel = model<User,IUserModel>("users", UserSchema);

export default UserModel;
