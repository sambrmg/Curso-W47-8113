const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfiguracoesSchema = new Schema({
    direcao: {type: String, required: true},
    usuario: {type: String, required: true}
});

module.exports = mongoose.model('ConfiguracoesSchema', ConfiguracoesSchema);