const { required } = require("nodemon/lib/config");

const express = require ('express');
const Wallet = require ('../modelos/wallet');
const router = express.Router();

router.post ('/altabilletera', async (req, res) =>{
    let nombre = nombre_;
    let saldo = saldo_;
    let billetera_= {
        nombre: nombre_,
<<<<<<< HEAD
=======
        saldo: saldo_,
>>>>>>> d9c3aa5705ef38cdb3c528434d33ad06c8f8833f
    }
    try {
        await Wallet.create (billetera_);
    } catch (error) {
        console.log (error)
    }
});