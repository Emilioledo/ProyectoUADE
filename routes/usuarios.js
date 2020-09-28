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
    // /*Modificar cuando tengamos el AJAX*/
        let nombre_= req.body.nombre;
        let mail_= req.body.mail;
        let password_= req.body.password;
        let usuario_ =
            {
                nombre: nombre_,
                mail: mail_,
                password: password_,
            };

            try {
                await Usuario.create (usuario_);
                console.log (usuario_);
            } catch (error){
                console.log (error);
            }  
});

module.exports = router;