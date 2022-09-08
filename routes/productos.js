import { Router } from "express";
import { check } from "express-validator";

import { validarCampos, validarJWT, rol } from "../middlewares/index.js";

import { actualizarProducto, crearProducto, eliminarProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.js";
import { existeProductoId, productoValido } from "../helpers/validar-producto.js";

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoId),
    check('nombre').custom(productoValido),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    rol('ADMIN_ROLE'),
    check('id', 'ID obligatorio').not().isEmpty().custom(existeProductoId),
    validarCampos
], eliminarProducto);

export{
    router as ProductoRouter
}