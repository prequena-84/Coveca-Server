require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const { validateQuantity } = require('../../../../dist/function/ventas-mongoDB.js');
const Inventario = require('./inventario.js');
const Producto = require('./producto.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema, model } = mongoose;

//Asociar un error a la conexion
db.on('error', () => {} );

// Esquema Venta
const salesSchema = new Schema({
    Id_Factura:{ type: String, unique: true, required: true }, // Campo único
    Fecha:String,
    IdCliente:String,
    IdVendedor:String,
    IdProducto:String,
    IdLote:String,
    exceptoIVA: Boolean,
    Cantidad:{
        type: Number,
        required: true,
        validate: {
            validator:async function(v) { 
                return v <= validateQuantity( await Inventario.quantityProduct(this.IdProducto) );
            },
            message: props => `La cantidad ingresada de ${props.value} no es valida para hacer la factura porque no hay esta cantidad de productos en el inventario`,
        }
    },
    Precio:Number,
    Moneda:String,
    SubTotal:Number,
    IVA:Number,
    Total:Number,
});

// Calculo de total
salesSchema.methods.CalculoSubTotal = function() {
    return this.Cantidad * this.Precio;
};

// Calculo IVA
salesSchema.methods.TotalIva = function() {
    return !this.exceptoIVA ? this.SubTotal * 0.16 : 0 ;
};

// Calculo Total
salesSchema.methods.CalculoTotal= function() {
    return this.SubTotal + this.IVA;
};

// Total facturas
salesSchema.statics.allInvoices = function() {
    return this.find();
};

// Filtro de Facturas por numero de vendedor
salesSchema.statics.findInvoicesIdseller = function(id) {
    return this.find({
        IdVendedor:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Instancia para el registro de nuevas facturas
salesSchema.statics.createInstance = async function(
    Id_Factura,
    Fecha,
    IdCliente,
    IdVendedor,
    IdProducto,
    IdLote,
    exceptoIVA,
    Cantidad,
) {
    const 
        newSale = new this({
            Id_Factura,
            Fecha,
            IdCliente,
            IdVendedor,
            IdProducto,
            IdLote,
            exceptoIVA,
            Cantidad,
        }),
        itemsProducto = await Producto.findProductCode(IdProducto)
    ;

    newSale.Precio = itemsProducto.precio;
    newSale.Moneda = itemsProducto.moneda;
    newSale.SubTotal = newSale.CalculoSubTotal();
    newSale.IVA = newSale.TotalIva();
    newSale.Total = newSale.CalculoTotal();
    return newSale.save();
};


// Asociacion del modelo de Venta
const Venta = model ('Venta', salesSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    await addSells('001-000003','02/05/2024', '1', 'YK-01', '002-000001', '000002', true, 70);
   
    // Metodo correcto para cerrar la conexion de la base de datos
    await mongoose.connection.close();
});

async function addSells(Id_Factura,Fecha,IdCliente,IdVendedor,IdProducto,IdLote,exceptoIVA,Cantidad) {
    try {
        await Venta.createInstance(
            Id_Factura,
            Fecha,
            IdCliente,
            IdVendedor,
            IdProducto,
            IdLote,
            exceptoIVA,
            Cantidad,
        );
    } catch(err) {
    };
};

module.exports = Venta;