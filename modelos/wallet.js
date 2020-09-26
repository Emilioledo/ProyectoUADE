const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const WalletEsquema = new Schema ({
    nombre: String,
    saldo: Number, 
});

const Wallet = mongoose.model('Wallet', WalletEsquema);

module.exports = Wallet