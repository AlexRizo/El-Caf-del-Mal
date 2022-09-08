import { Categoria, Producto } from "../models/index.js";

const productoValido = async(nombre = '') => {
    // Verificar si el producto existe;
    const existeProducto = await Producto.findOne({
        nombre: nombre.toLocaleUpperCase(), 
        estado: true
    });
        
    if (existeProducto) {
        throw new Error(`El producto ${nombre} ya existe`);
    }
}

const existeProductoId = async(id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeProducto = await Producto.findById( id ).exec();
        if ( !existeProducto || !existeProducto.estado) {
            throw new Error(`No existe un producto con el id ${id}`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

export {
    existeProductoId,
    productoValido
}