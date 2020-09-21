const express = require ('express');
const Usuario = require('../modelos/user');
const router = express.Router();


router.get ('/usuarios', async (req, res)=>{
    try {
      const arrayUsuarios = await Usuario.find ();
      console.log (arrayUsuarios);
    } catch (error){
      console.log (error);
    }
});

router.post ('/altausuario', async(req, res)=>{
    /*Modificar cuando tengamos el AJAX*/
    let nombre_= req.body.nombre;
    let apellido_= req.body.apellido;
    let mail_= req.body.mail;
    let password_= req.body.password;

    let usuario_= {
        nombre: nombre_,
        apellido: apellido_,
        mail: mail_,
        password: password_,
    }
    console.log (usuario_);

    try {
        await Usuario.create (usuario_);
    } catch (error){
        console.log (error);
    }

});

module.exports = router;