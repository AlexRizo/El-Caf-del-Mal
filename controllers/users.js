import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../models/user.js';

const usuariosGet = async(req = request, res = response) => {
    // const {q, nombre = 'unknown', apikey} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const registros = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        usuarios,
    })
}

const usuariosPost = async(req = request, res = response) => {
    const {nombre, correo, password, rol} = req = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar contraseña;
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB;
    await usuario.save();
    
    res.json(usuario)
}

const usuariosPut = async(req = request, res = response) => {
    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // TODO: validar contra db
    if (password) {
            // Encriptar contraseña;
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'put API - controller',
        usuario,
    })
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

const usuariosDelete = async(req = request, res = response) => {
    const {id} = req.params
    
    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id); // NO recomendado;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    
    res.json(usuario)
}

export{
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}