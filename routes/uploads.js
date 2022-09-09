import { Router } from "express";
import { check } from "express-validator";
import { cargarArchivo } from "../controllers/uploads.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/', [
    
], cargarArchivo)

export{
    router as uploadsRouter
}