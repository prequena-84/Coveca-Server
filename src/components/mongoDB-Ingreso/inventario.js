require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema } = mongoose;

// Asociar un error a la conexion
db.on('error', () => {} ); //console.error.bind(console, '  error:'));

// Esquema Ventas
const inventorySchema = new Schema({
    Id_Lote:{ type: String, unique: true, required: true }, // Campo único
    IdProducto:String,
    IdVendedor: String,
    fechaElaboracion:Date,
    fechaVencimiento:Date,
    stock:Number,
    precioUnidad:Number,
    precioLote:Number,
    moneda:String,
});

// Calculo Total
inventorySchema.methods.CalculoTotal=  function() {
    return this.stock * this.precioUnidad;
};

// Total facturas
inventorySchema.statics.allInventory = function() {
    return this.find();
};

inventorySchema.statics.quantityProduct = function(id) {
    return this.find({
        IdProducto:id,
    });
};

// Filtro de Facturas por numero de vendedor
inventorySchema.statics.findInventoryIdProduct = async function(id) {
    return await this.find({
        IdProducto:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

inventorySchema.statics.findInventoryDate = async function(fechaVencimiento) {
    return await this.find({
        fechaVencimiento:new RegExp(`^${ fechaVencimiento.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Instancia para el registro de nuevas facturas
inventorySchema.statics.createInstance = async function(
    Id_Lote,           // Campo único
    IdProducto,
    IdVendedor,
    fechaElaboracion,
    fechaVencimiento,
    stock,
) {
    try{
        const 
            newInventory = new this({
                Id_Lote,           
                IdProducto,
                IdVendedor,
                fechaElaboracion,
                fechaVencimiento,
                stock,
            }),
            itemProduct = await Productos.findOne({ Id_Producto:IdProducto })
        ;

        newInventory.precioUnidad = itemProduct.precio;
        newInventory.precioLote = newInventory.CalculoTotal();
        newInventory.moneda = itemProduct.moneda;
    
        return await newInventory.save();
    } catch(err) {
    }
};

inventorySchema.statics.add = async function(dataInventory) {
    await this.create(dataInventory);
};

// Asociacion del modelo de ventas
const Inventario = mongoose.model ('Inventario', inventorySchema);

// abrir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {

    const inventory = {
        Id_Lote:'000003',
        IdProducto:'001-000001',
        IdVendedor:'PR-01',
        fechaElaboracion:'01/07/2025',
        fechaVencimiento:'01/12/2025',
        stock:700,
    }
   
    console.log('--------------Inicio de registro de inventario ----------------');
    try {
        await Inventario.add(inventory);
    } catch(err) {
       //console.log('error inventario 3', err);
    };

    //const inventario = await Inventario.quantityProduct('002-000001');

    //console.log(inventario);
    
    /*const totalInventario = inventario.reduce( (total, item)  => {
        return total + item.stock;
    }, 0);*/

    //console.log( totalInventario );

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Inventario;