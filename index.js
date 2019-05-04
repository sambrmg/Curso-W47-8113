const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const instrucoesRouter = require('./api/routes/instrucoes.route');
const cartoesRouter = require('./api/routes/cartoes.route');
const configuracoesRouter = require('./api/routes/configuracoes.route');

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
  .use('/api/configuracoes', configuracoesRouter)
  .use('/api/cartoes', cartoesRouter)
  .use('/api/instrucoes', instrucoesRouter)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
