import { json, response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from '../models/user.js';
import { generarJWT } from "../helpers/jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


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

const googleSignIn = async(req, res = response) => {
    const {id_token} = req.body;

    try {
        const {nombre, correo, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario Bloqueado'
            })
        }

        // Generar JWT;
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        });   
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Imposible verificar token',
            error
        })
    }
}

export {
    login,
    googleSignIn,
}