const Producto = require('../insertar/producto');

UpdateProduct('002-000001', {
    Articulo:'Blister Pimienta',
    unidadMedida:'Kilos',
    precio:3.5,
    moneda:'Bs',
});

async function UpdateProduct(id, dataProduct) {
    try {
        const producto = await Producto.actualizarProducto(id, dataProduct);
        console.log('producto actualizado', producto)
    } catch(err) {
        console.log('error', err);
    };
};

/**
 * Funciono solo me queda quitar los console log (Listo), fusionar (P) y luego crear los endpoint de peticion get o post (P #2)
 */