const mongoose = require('mongoose');
const path = require('path');

// Archivo para la conexión modular de mongoose
require('dotenv').config({ path: path.resolve(__dirname,'../../../../../.env') });
const uriMongoDB = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.KEY_MONGODB}@${process.env.CLOUSTER_OPERATIONS}${process.env.URI_MONGO}${process.env.CLOUSTER_OPERATIONS}`;

const connectDB = async () => {
   try {
      console.log(uriMongoDB);
      await mongoose.connect(uriMongoDB);
      console.log('conexion a mongo');
   } catch(err) {
      console.log('Error al intentar de conectarse a Mongoose: ', err );
      process.exit(1); // Salir del proceso en caso de error
   };
};

module.exports = {
   mongoose,
   connectDB,
};

//const uri = "mongodb+srv://prequena:<db_password>@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones";