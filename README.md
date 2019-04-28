# App Heroku

```
Depois de seguir o tutorial do heroku executar o comando a seguir:
npm i nodemon

Para iniciar o servidor digite: 
nodemon

Excluir todo o conteudo do diretório pubilc/ e incluir todo os diretorios css,js,img do projeto CEEP

Excluir todo o conteudo do diretório views/ e copiar o index.html do projeto CEEP para o diretório views/ e mudar a extensão para .ejs

Criar um diretório chamado api/ e dentro dele os diretorios controllers/ e routes/

```
## Estrutura de arquivos

<img src="https://sambrmg.github.io/Curso-W47-8113/estrutura.png" alt="simple menu js" style="width: 200px !important;">


## Conteúdo de arquivos

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
  .get('/', (req, res) => res.render('index'))
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
