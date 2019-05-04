const express = require('express');
const router = express.Router();

const cartoesController = require('../controllers/cartoes.controller');

router.get('/:usuario', cartoesController.cartoesPorEmail );
router.post('/incluir', cartoesController.incluir );

module.exports = router;