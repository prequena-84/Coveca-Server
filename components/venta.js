
/**
 *  Quede en revisar la function quantityProduct ya uqe si pasa el numero de producto perfectamente
 */

const Inventario = require('./Inventario');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

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
            validator: async function(v) { 

                const inventary = await Inventario.quantityProduct(this.IdProducto);

                console.log('revision de la validacion intentario', inventary);

                return v <= inventary; 
            },
            message: props => `${props.value} no es valido para hacer la factura no hay productos cargados en el Modulo de Inventarios`,
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
salesSchema.statics.findInvoicesIdseller = async function(id) {
    return await this.find({
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
    Moneda,
) {
    const newSale = new this({
        Id_Factura,
        Fecha,
        IdCliente,
        IdVendedor,
        IdProducto,
        IdLote,
        exceptoIVA,
        Cantidad,
        Precio,
        Moneda,
    });

    console.log( 'revision de producto', await Inventario.quantityProduct(IdProducto) );

    newSale.SubTotal = newSale.CalculoSubTotal();
    newSale.IVA = newSale.TotalIva();
    newSale.Total = newSale.CalculoTotal();

    return newSale.save();
};

// Asociacion del modelo de Venta
const Venta = mongoose.model ('Venta', salesSchema);

// Quede en incluir en las Venta el lote del inventario 

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    console.log('--------------Inicio de regsitro de Venta----------------');
    //try {
        await Venta.createInstance(
            '001-000001',     // Id_Factura
            '10/02/2025',     // Fecha
            '1',              // Id_Cliente
            'YK-01',          // Id_Vendedor
            '001-000001',     // Id_Producto
            '000001',         // Lote
            true,             // exceptoIVA
            10,               // Cantidad
            32.54,            // Precio
            'BS',             // Moneda
        );

        console.log('--------------Registro de Venta ok------------------------');
    //} catch(err) {
        //console.log('error venta', err);
    //};

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Venta;