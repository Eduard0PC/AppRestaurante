const express = require('express');
const router = express.Router();
const { getConnection } = require('./db');

// Ruta para obtener registros de empleados
router.get('/registros', (req, res) => {
    const connection = getConnection();
    const query = `
        SELECT r.id_registro, r.id_usuario, u.nombre_usuario, r.entrada, r.salida
        FROM RegistroHorario r
        JOIN UsuariosNom u ON r.id_usuario = u.id_usuario
        ORDER BY r.entrada DESC
    `;

    connection.query(query, (error, results) => {
        connection.end();
        if (error) {
            console.error('Error al obtener registros:', error);
            return res.status(500).json({ error: 'Error al obtener registros' });
        }
        res.json({ success: true, registros: results });
    });
});

module.exports = router;
