const express = require('express');
const CRutas = require('../controlador/admin/CrearClienteControlador');
const router = express.Router();

router.post('/acclientes', CRutas.crearCliente);

module.exports = router; 