const express = require('express');
const router = express.Router();
//const bodyParse = require('body-parser');
const { ClientAdd } = require('../../components/clientes/registro-cliente');

//router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try{
        /*ClientAdd(
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
            'Tg1234*27',                 // PassWord
        );*/

        ClientAdd(
            '2',         //Id_Cliente
            'Antonio',      //nombre
            'Gutierrez',    // apellido
            18569859,    //cedula
            'V1185698590', //RIF
            38,          // edad
            'Caracas', // direccion
            'agutierrez@hotmail.com', // mail
            '+54-424-123-45-657',   // whastApp
            'AGutierrez',             // UserName
            '278*gfñ78',                 // PassWord
        );

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