import { response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../models/user.js';
import { generarJWT } from "../helpers/JWT.js";


const login = async(req, res = response) => {
    const {correo, password} = req.body;
    
    try {
        // TODO: verificar email;
        const usuario = await Usuario.findOne({correo});
        if(!usuario) return res.status(400)
            .json({ 
                msg: 'usuario / Contraseña no son correctos - correo'
            });
        
        // TODO: verificar si el usuario está activo;
        if(usuario.estado === false) return res.status(400)
        .json({ 
            msg: 'usuario / Contraseña no son correctos - correo - estado:false'
        });

        // TODO: verificar contraseña;
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword)return res.status(400)
            .json({ 
                msg: 'usuario / Contraseña no son correctos - password'
            });

        // TODO: generar JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ // res YA es un RETURN;
            msg: "Hable con el administrador"
        })
    }
}

export {
    login
}