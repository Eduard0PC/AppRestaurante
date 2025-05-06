const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

// Generar QR del usuario autenticado
router.post('/generate-qr', async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    try {
        const qrData = await QRCode.toDataURL(user.id.toString());
        res.json({ qrCode: qrData });
    } catch (error) {
        console.error('Error generando QR:', error);
        res.status(500).json({ error: 'Error al generar el QR' });
    }
});

module.exports = router;
