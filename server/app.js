require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const qrRoutes = require('./qr');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }  // 10 minutos de sesión activa
}));

// Rutas
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', qrRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
