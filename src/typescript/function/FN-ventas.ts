import type { IProduct } from '../interface/query-venta';

function validateQuantity( inventario:IProduct[] ): number {
    const totalInventario = inventario.reduce( (total, item) => {
        return total + item.stock;
    }, 0);

    return totalInventario;
};

export {
    validateQuantity,
}