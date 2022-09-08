import { response } from "express";
import { Categoria, Usuario } from "../models/index.js";

const obtenerCategorias = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async(req, res = response) => {
    const {id} = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    if (!categoria.estado) {
        return res.status(404).json({
            msg: `La categoría con el id ${id} no existe`
        });
    }

    res.json({
        categoria
    });
}

const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar data a guardar;
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB;
    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();

    if (!id) {
        return res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, {nombre});

    res.json(categoria);

}

const borrarCategoria = async(req, res) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria);
}

export {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}