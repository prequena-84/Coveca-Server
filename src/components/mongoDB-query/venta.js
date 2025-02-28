const Inventario = require('./inventario');
const Producto = require('./producto');
const { validateQuantity } = require('../../../dist/function/FN-ventas.js');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

//Asociar un error a la conexion
db.on('error', err => console.log(err));

// Esquema Venta
const salesSchema = new mongoose.Schema({
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
    Precio,
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
            Precio,
        }),
        monedaProducto = await Producto.findProductMoney(IdProducto)
    ;

    newSale.Moneda = monedaProducto.moneda;
    newSale.SubTotal = newSale.CalculoSubTotal();
    newSale.IVA = newSale.TotalIva();
    newSale.Total = newSale.CalculoTotal();
    return newSale.save();
};

// Asociacion del modelo de Venta
const Venta = mongoose.model ('Venta', salesSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {

    console.log('--------------Inicio de regsitro de Venta----------------');
    try {
        await Venta.createInstance(
            '001-000002',     // Id_Factura 
            '28/02/2025',     // Fecha
            '1',              // Id_Cliente
            'PR-01',          // Id_Vendedor
            '002-000001',     // Id_Producto
            '000002',         // Lote
            true,             // exceptoIVA
            20,               // Cantidad
            30.20,            // Precio
        );
        console.log('--------------Registro de Venta ok------------------------');
    } catch(err) {
        console.error('error #1', err);
    };

    /*console.log('--------------Inicio de regsitro de Venta #2----------------');
    try {
        await Venta.createInstance(
            '001-000002',     // Id_Factura 
            '28/02/2025',     // Fecha
            '1',              // Id_Cliente
            'YZ-01',          // Id_Vendedor
            '002-000001',     // Id_Producto
            '000002',         // Lote
            true,             // exceptoIVA
            20,               // Cantidad
            30.20,            // Precio
        );
        console.log('--------------Registro de Venta ok------------------------');
    } catch(err) {
        console.error('error #2', err);
    };*/

    // Metodo correcto para cerrar la conexion de la base de datos
    await mongoose.connection.close();
});

module.exports = Venta;