const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');
const saltRounds = 10;

const UserEsquema = new Schema ({
    nombre: String,
    mail: String,
    password: String,
    updated: { type: Date, default: Date.now },
});

UserEsquema.pre('save', async function (next) { 
    try {
        await bcrypt.hash (this.password, saltRounds, (error, hash) =>{
            this.password = hash;
        });
    } catch (error) {
        console.log (error);
    }

});

const Usuario = mongoose.model ('Usuario', UserEsquema);

module.exports = Usuario;