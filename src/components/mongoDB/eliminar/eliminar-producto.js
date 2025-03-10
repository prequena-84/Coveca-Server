const Producto = require('../insertar/producto');

DeleteProduct();

// funciono este metodo para eliminar el prodcutos seleccionado pero tengo que quitar el codigo que carga la funcion.
async function DeleteProduct() {
    await Producto.deleteOne({Id_Producto:'001-000001'})
    .then( resultado => console.log( resultado ))
    .catch( err => console.log( err ) );
};