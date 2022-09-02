import { Router } from "express";
import { check } from "express-validator";
import { 
    usuariosDelete, 
    usuariosGet, 
    usuariosPatch, 
    usuariosPost, 
    usuariosPut 
} from "../controllers/users.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { correoValido, existeUsuarioId, rolValido } from "../helpers/db-validators.js";


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id').custom(existeUsuarioId),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña tiene que tener por lo menos 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail().custom(correoValido),
    check('rol').custom(rolValido),
    validarCampos
],usuariosPost);

router.delete('/:id', [
    check('id').custom(existeUsuarioId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

export {
    router
}