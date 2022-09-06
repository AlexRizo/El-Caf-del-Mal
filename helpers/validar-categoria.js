import { Categoria } from "../models/index.js";

const categoriaValida = async(categoria = '') => {
    // Verificar si la categoría existe;
    const nombre = categoria.toLocaleUpperCase()
    const existCat = await Categoria.findOne({nombre});
    
    if (existCat) {
        throw new Error(`La categoría ${nombre} ya existe`);
    }
}

const existeCategoriaId = async(id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeCategoria = await Categoria.findById( id ).exec();
        if ( !existeCategoria ) {
            throw new Error(`No existe una categoría con el id ${id}`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido`);
    }
}

export {
    existeCategoriaId,
    categoriaValida
}