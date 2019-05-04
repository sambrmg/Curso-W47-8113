const express = require('express');
const router = express.Router();
const configuracoesController = require('../controllers/configuracoes.controller');
router.post('/salvar', configuracoesController.salvar );
router.get('/:usuario', configuracoesController.buscar );
module.exports = router;