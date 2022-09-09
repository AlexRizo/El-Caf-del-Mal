import { response } from "express";
import { subirArchivo } from "../helpers/index.js";

const cargarArchivo = async(req, res = response || !req.files.archivo) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: 'No files were uploaded.'
      });
    }

    try {
        // txt, md
        const nombre = await subirArchivo.subirArchivo(req.files, ['txt', 'md']);
        res.json({nombre});
    } catch (msg) {
        res.status(400).json({msg});
    }
}

export {
    cargarArchivo
}