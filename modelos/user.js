const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const UserEsquema = new Schema ({
    nombre: String,
    mail: String,
    password: String,
    updated: { type: Date, default: Date.now },
});

UserEsquema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next ();
    } catch (error) {
        next (error);
    }

});

const Usuario = mongoose.model ('Usuario', UserEsquema);

module.exports = Usuario;