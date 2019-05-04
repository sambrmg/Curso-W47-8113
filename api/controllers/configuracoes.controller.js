const Configuracoes = require('../models/configuracoes.model');

exports.salvar = function (req, res, next) {
    let configuracoes = new Configuracoes({
        direcao: req.body.direcao,
        usuario: req.body.usuario
    })
    limparBase()
    configuracoes.save(function (err){
        if(err) return next(err)
        res.send( { direcao: req.body.direcao });
    })
};

exports.buscar = function (req, res) {
    Configuracoes.find({
        usuario: req.params.usuario
    }, function (err, configuracoes) {
        if (err) return next(err);
        res.send(configuracoes);
    })
};

function limparBase(){
    Configuracoes.deleteMany({}).exec()
}