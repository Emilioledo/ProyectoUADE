const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserEsquema = new Schema ({
    nombre: String, 
    apellido: String, 
    mail: String, 
    password: String, 
    updated: { type: Date, default: Date.now },
})

const Usuario = mongoose.model ('Usuario', UserEsquema);

module.exports = Usuario;