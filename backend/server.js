const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db-connection');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/apiCard');

dotenv.config();  // Cargar variables de entorno
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());  // Para parsear JSON en las peticiones

// Rutas
app.use('/auth', authRoutes);
app.use('/api', cardRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
