const express = require ('express');
const router = express.Router();


router.get ('/usuarios', async (req, res)=>{
    try {
      const arrayUsuarios = await Usuario.find ();
      console.log (arrayUsuarios);
    } catch (error){
      console.log (error);
    }
});

router.post ('/altausuarios', async(req, res)=>{
    
});

module.exports = router;