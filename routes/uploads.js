import { Router } from "express";
import { check } from "express-validator";

import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";

import { coleccionesPermitidas } from "../helpers/db-validators.js";

import { validarArchivo, validarCampos } from "../middlewares/index.js";

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'el id no es válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['productos', 'usuarios'])),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'el id no es válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['productos', 'usuarios'])),
    validarCampos
], actualizarImagenCloudinary);

export {
    router as uploadsRouter
}