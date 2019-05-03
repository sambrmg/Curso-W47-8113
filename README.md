# App Heroku

```
Depois de seguir o tutorial do heroku executar o comando a seguir:
npm i nodemon mongoose body-parser

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
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000

const instrucoesRouter = require('./api/routes/instrucoes.route');
const cartoesRouter = require('./api/routes/cartoes.route');



// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = '';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



express()
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use('/api/cartoes', cartoesRouter)
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


**api/models/instrucoes.models.js**

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartoesSchema = new Schema({
    conteudo: {type: String, required: true},
    cor: {type: String, required: true}
});

let InstrucoesSchema = new Schema({
    usuario: {type: String, required: true},
    cartoes: [CartoesSchema],
});

module.exports = mongoose.model('Instrucoes', InstrucoesSchema);
```
**api/controllers/cartoes.controller.js**

```javascript
const Cartoes = require('../models/cartoes.model');

exports.incluir = function (req, res, next) {
    limparBase();
    let cartoes = new Cartoes({
        usuario: req.body.usuario,
        cartoes: req.body.cartoes
    })
    cartoes.save(function (err){
        if(err) return next(err)
        res.send( { usuario: req.body.usuario, quantidade: req.body.cartoes.length });
    })
};

exports.cartoesPorEmail = function (req, res) {
    Cartoes.find({
        usuario: req.params.usuario
    }, function (err, cartoes) {
        if (err) return next(err);
        res.send(cartoes);
    })
};

function limparBase(){
    Cartoes.deleteMany({}).exec()
}
```
