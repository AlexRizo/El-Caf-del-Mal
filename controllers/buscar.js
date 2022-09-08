import { response } from "express";
import mongoose from "mongoose";

import { Categoria, Producto, Usuario } from "../models/index.js";

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async(termino = '', res = response) => {
    const mongoID = mongoose.Types.ObjectId.isValid(termino);

    if (mongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : ['No se ha encontrado nada']
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular, elimina el case sensitive (Mayúsculas y Minúsculas).

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    });
}

const buscarProducto = async(termino = '', res = response) => {
    const mongoID = mongoose.Types.ObjectId.isValid(termino);

    if (mongoID) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : ['No se ha encontrado nada']
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular, elimina el case sensitive
    
    const productos = await Producto.find({
        $or: [{nombre: regex}, {descripcion: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: productos
    });
}

const buscarCategoria = async(termino = '', res = response) => {
    const mongoID = mongoose.Types.ObjectId.isValid(termino);

    if (mongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : ['No se ha encontrado nada']
        });
    }

    const regex = new RegExp(termino, 'i'); // Expresión regular, elimina el case sensitive
    
    const categorias = await Categoria.find({nombre: regex, estado: true});

    res.json({
        results: categorias
    });
}

const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;
    
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
        break;
        case 'categorias':
            buscarCategoria(termino,  res);
        break;
        case 'productos':
            buscarProducto(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'watafak'
            });
    }
}

export{
    buscar
}