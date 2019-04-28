# App Heroku

```
npm i nodemon
```

```
Excluir toda o conteudo do diretório **pubilc/** e incluir todo os diretorios **css,js,img** do projeto ceep
```


**index.js**

```javascript
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const instrucoesRouter = require('./api/routes/instrucoes.route');

express()
  .use('/api/instrucoes', instrucoesRouter)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
```


**api/controllers/instrucoes.controller.js**

```javascript
exports.listar = function (req, res) {
    res.send([
        "Bem Vindo ao Ceep",
        "Clique no btn Linhas para mudar o layout"
    ]);
};
```

**api/routes/instrucoes.route.js**

```javascript
const express = require('express');
const router = express.Router();
const instrucoesController = require('../controllers/instrucoes.controller');
router.get('/listar', instrucoesController.listar );

module.exports = router;
```
