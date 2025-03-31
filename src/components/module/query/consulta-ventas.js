require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const Ventas = require('../mongoDB-Ingreso/venta');

db.on('error', () => {} );

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
  try {

    const reporteVentas = await Ventas.aggregate([
      {
        $lookup: {
          from: "clientes",           // Tabla a unificar
          localField: "IdCliente",    // Campo de ID colección de ventas
          foreignField: "Id_Cliente", // Campo de ID colección de clientes
          as: "cliente",              // Nombre del campo donde se guardará la información combinada
        }
      },
      {
        $unwind: "$cliente"
      },
      {
        $lookup: {
          from: "vendedors",           // Tabla a unificar
          localField: "IdVendedor",    // Campo de ID colección de ventas
          foreignField: "Id_Vendedor", // Campo de ID colección de vendedores
          as: "vendedor",              // Nombre del campo donde se guardará la información combinada
        }
      },
      {
        $unwind: "$vendedor"
      },
      {
        $lookup: {
          from: "productos",           // Tabla a unificar
          localField: "IdProducto",    // Campo de ID colección de ventas
          foreignField: "Id_Producto", // Campo de ID colección de vendedores
          as: "producto",              // Nombre del campo donde se guardará la información combinada
        }
      },
      {
        $unwind: "$producto"
      },
      {
        $lookup: {
          from: "inventarios",           // Tabla a unificar
          localField: "IdLote",    // Campo de ID colección de ventas
          foreignField: "Id_Lote", // Campo de ID colección de vendedores
          as: "inventario",              // Nombre del campo donde se guardará la información combinada
        }
      },
      {
        $unwind: "$inventario"
      }
    ]);

    console.log(reporteVentas);

  } catch(err) {

    console.log('error de la consulta', err);
  } finally {

    // Cierra la conexión después de que se complete la consulta
    await mongoose.connection.close();
  };
});