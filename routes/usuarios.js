const express = require ('express');
const Usuario = require('../modelos/user');
const bcrypt = require ('bcrypt');
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
        let usuario_ =
            {
                nombre: req.body.nombre,
                mail: req.body.mail,
                password: req.body.password,
            };

            try {
                await Usuario.create (usuario_);
                console.log (usuario_);
            } catch (error){
                console.log (error);
            }  
});

module.exports = router;