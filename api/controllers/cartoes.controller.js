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