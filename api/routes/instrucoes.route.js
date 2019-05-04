const express = require('express');
const router = express.Router();
const instrucoesController = require('../controllers/instrucoes.controller');
router.get('/listar', instrucoesController.listar );

module.exports = router;