const { required } = require("nodemon/lib/config");

const express = require ('express');
const Wallet = require ('../modelos/wallet');
const router = express.Router();

router.post ('/altabilletera', async (req, res) =>{
    let nombre = nombre_;
    let billetera_= {
        nombre: nombre_,
    }
    try {
        await Wallet.create (billetera_);
    } catch (error) {
        console.log (error)
    }
});