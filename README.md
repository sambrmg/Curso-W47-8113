# App Heroku

api/controllers/instrucoes.controller.js

```javascript
exports.listar = function (req, res) {
    res.send([
        "Bem Vindo ao Ceep",
        "Clique no btn Linhas para mudar o layout"
    ]);
};
```

api/routes/instrucoes.route.js

```javascript
const express = require('express');
const router = express.Router();
const instrucoesController = require('../controllers/instrucoes.controller');
router.get('/listar', instrucoesController.listar );

module.exports = router;
```
