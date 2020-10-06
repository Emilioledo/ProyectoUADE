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

        const usuarioData = new Usuario (); 
        usuarioData.nombre = req.body.nombre;
        usuarioData.mail = req.body.mail;
        usuarioData.password = req.body.password;
            try {
                await usuarioData.save();
                console.log (usuarioData);
            } catch (error){
                console.log (error);
            }  
});

module.exports = router;