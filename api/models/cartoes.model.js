const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartaoSchema = new Schema({
    conteudo: {type: String, required: true},
    cor: {type: String, required: true}
});

let CartoesSchema = new Schema({
    usuario: {type: String, required: true},
    cartoes: [CartaoSchema],
});

module.exports = mongoose.model('MeuCartao', CartoesSchema);