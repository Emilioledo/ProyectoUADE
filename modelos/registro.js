const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const RegistroEsquema = new Schema ({
    descripcion: String,
    value: Number,
    date: Date,
    user: String,
    type: Number,
    updated: { type: Date, default: Date.now },
});

const Registro = mongoose.model ('Registro', RegistroEsquema);

module.exports = Registro;