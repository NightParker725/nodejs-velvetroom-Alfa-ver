import mongoose from "mongoose";

process.loadEnvFile();
const connectionString  =  process.env.MONGO_URI || ""; 
//aqui se intenta establcer la conexion con la base de datos mediante el string de conexion que tenemos en el .env
// si se conecta bien, se muestra un mensaje en consola, si no, se muestra el error
export const db = mongoose.connect(connectionString)
  .then(() => console.log("Conectado a MongoDB exitosamente"))
  .catch((error) => console.error(error));
