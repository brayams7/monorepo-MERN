//HACER USO PARA LAS VARIABLES DE ENTORNO.
import "dotenv/config"

import { connect} from "mongoose"

const dbConnect = async () => {
    const DB_URI = <string> process.env.DB_URI //string para conectarnos a mongo
    await connect(DB_URI)
}

export default dbConnect;
