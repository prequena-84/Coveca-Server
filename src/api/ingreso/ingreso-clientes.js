const express = require('express');
const router = express.Router();
//const bodyParse = require('body-parser');
const { ClientAdd } = require('../../components/clientes/registro-cliente');

//router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try{
        ClientAdd(
            '1',         //Id_Cliente
            'Tito',      //nombre
            'Guerra',    // apellido
            16859785,    //cedula
            'V16859785', //RIF
            41,          // edad
            'La Guaira', // direccion
            'titoguerra@gmail.com', // mail
            '+54-424-123-45-657',   // whastApp
            'TTGuerra',             // UserName
            '1234',                 // PassWord
        )

        res.status(200).send({
            mensaje:'Api de servicio para registro de clientes'
        });
    } catch(err) {
        res.status(500).send({
            mensaje:`err: ${err}`,
        });
    };
});

// Metodo para registro de cliente
/*router.post("/registrationClient",  (req, res) => {
    
})*/

module.exports = router;