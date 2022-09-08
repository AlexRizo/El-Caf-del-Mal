import express from "express";
import cors from "cors";

import path from "path";
import { fileURLToPath, URL } from 'url';

import { dbConection } from "../database/config.js";

import { userRouter } from "../routes/users.js";
import { authRouter } from "../routes/auth.js";
import { categoriaRouter } from "../routes/categorias.js";
import { ProductoRouter } from "../routes/productos.js";
import { buscarRouter } from "../routes/buscar.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this._port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar'
        }

        // Conectar DB
        this.conectarDB();

        // Middlewares;
        this.middlewares();
        
        // Rutas;
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        
        // Directorio public;
        this.app.use(express.static('public'));
    }

    routes() {        
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.usuarios, userRouter);
        this.app.use(this.paths.categorias, categoriaRouter);
        this.app.use(this.paths.productos, ProductoRouter);
        this.app.use(this.paths.buscar, buscarRouter);


        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', '404.html'));
        });
    }

    start() {
        this.app.listen(this._port, () => {
            console.log('Running on port', this._port);
        });
    }
}

export {
    Server
};