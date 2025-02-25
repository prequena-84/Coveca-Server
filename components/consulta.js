const Ventas = require('./venta.js');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {

    await Ventas.aggregate([
        {
            $lookup: {
              from: "clientes",         // Tabla a unificar
              localField: "Id_Cliente", // Campo de ID colección de ventas
              foreignField: "id",       // Campo de ID colección de clientes
              as: "cliente"             // Nombre del campo donde se guardará la información combinada
            }
          },
          {
            $unwind: "$cliente"
          },
          {
            $lookup: {
              from: "vendedores",
              localField: "Id_Vendedor",
              foreignField: "id",
              as: "vendedor"
            }
          },
          {
            $unwind: "$vendedor"
          }
    ])
    .then( ventas => {
        console.log(ventas);
    }).catch( error => console.log(error) );

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});