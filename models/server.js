import express from "express";
import cors from "cors";
import { router } from "../routes/users.js";
import path from "path";
import { fileURLToPath, URL } from 'url';
import { dbConection } from "../database/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this._port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

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
        this.app.use(this.usuariosPath, router);

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

export {Server};