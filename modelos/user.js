const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserEsquema = new Schema ({
    nombre: {String, required: true},
    mail: {String, required: true}, 
    password: {String, required: true}, 
    updated: { type: Date, default: Date.now },
    lastLoginDate: {
        type: Date,
        default: Date.now()
    }
})

const Usuario = mongoose.model ('Usuario', UserEsquema);

module.exports = Usuario;