import { Router } from "express";
import { check } from "express-validator";

import { categoriaValida, existeCategoriaId } from "../helpers/validar-categoria.js";

import { 
    obtenerCategorias, 
    crearCategoria, 
    obtenerCategoria, 
    actualizarCategoria,
    borrarCategoria
} from "../controllers/categorias.js";

import { rol, validarCampos, validarJWT } from "../middlewares/index.js";

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las cateogrias - Public;
router.get('/', obtenerCategorias);

// Obtener una categoría por id - Public;
router.get('/:id', [
    check('id').custom(existeCategoriaId),
    validarCampos
], obtenerCategoria);

// Crear categoría - Private - Cualquier persona con un token válido;
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - Private - Cualquiera con token válido;
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaId),
    check('nombre', 'la categoría es obligatoria').not().isEmpty().custom(categoriaValida),
    validarCampos
], actualizarCategoria);

// Borrar categoria - Admin;
router.delete('/:id', [
    validarJWT,
    rol('ADMIN_ROLE'),
    check('id', 'ID obligatorio').not().isEmpty().custom(existeCategoriaId),
    validarCampos
], borrarCategoria);

export {
    router as categoriaRouter
}