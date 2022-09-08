import { response } from "express";
import { Categoria, Producto } from "../models/index.js";

const obtenerProductos = async(req, res = response) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProducto = async(req, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    if (!producto.estado) {
        return res.status(404).json({
            msg: `El producto con el id ${id} no existe`
        });
    }

    res.json(producto);
}

const crearProducto = async(req, res = response) => {
    const {descripcion, precio, disponible} = req.body
    const nombre = req.body.nombre.toUpperCase();
    const categoria = req.body.categoria.toUpperCase();

    const productoDB = await Producto.findOne({nombre});
    const categoriaDB = await Categoria.findOne({categoria, estado: true})
    
    if (productoDB) {
        return res.status(406).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    if (!categoriaDB) {
        return res.status(404).json({
            msg: `La categoria ${categoria} no existe`
        });
    }

    const data = {
        nombre,
        descripcion,
        precio,
        categoria: categoriaDB._id,
        disponible,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async(req, res = response) => {
    const {id} = req.params;
    const {descripcion, precio, categoria, disponible, nombre} = req.body;

    if (!id) {
        return res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }

    let data = {
        descripcion,
        precio,
        disponible
    }

    if (nombre) {
        data.nombre = nombre.toUpperCase();
    }

    if (categoria) {
        const categoriaDB = await Categoria.findOne({nombre: categoria.toUpperCase(), estado: true});
        if (!categoriaDB) return res.status(404).json({msg: `La categoria ${categoria} no existe`});

        data.categoria = categoriaDB._id
    }

    const producto = await Producto.findByIdAndUpdate(id, data)

    res.json(producto)
}

const eliminarProducto = async(req, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Se ha eliminado el siguiente producto:',    
        producto
    });
}

export{
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
}