"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuantity = validateQuantity;
function validateQuantity(inventario) {
    const totalInventario = inventario.reduce((total, item) => {
        return total + item.stock;
    }, 0);
    return totalInventario;
}
;
