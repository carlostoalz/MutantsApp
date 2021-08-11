import express from 'express';
import { conectarBD } from './src/config/db';
import cors from 'cors';

import muntantesRoutes from './src/routes/mutante.routes'

// Crear el Servidor
const app = express();

// Conectar a la base de datos
conectarBD();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json());

// Puerto de la app
const PORT = process.env.PORT || 4000; 

// Importar Rutas
app.use('/', muntantesRoutes)

// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});