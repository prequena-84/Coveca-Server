const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const ClientAdd = require('../../components/module/cliente/registrar/registro-cliente');

router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try{
        /*const dataClient = [
            '1',                    // Id_Cliente
            'Tito',                 // Nombre
            'Guerra',               // Apellido
            16859785,               // Cedula
            'V16859785',            // RIF
            41,                     // Edad
            'La Guaira',            // direccion
            'titoguerra@gmail.com', // Mail
            '+54-424-123-45-657',   // WhastApp
            'TTGuerra',             // UserName
            'Tg1234*27',            // PassWord
        ];
        const resClient = await ClientAdd(dataClient);*/

        res.status(200).send({
            mensaje:'Servicio modulo de Clientes',
        });
    } catch(err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        });
    };
});

// Metodo para registro de cliente
router.post("/cliente-registro", async (req, res) => {
    try {
        const 
            data = req.body,
            dataClient = [
                data.IdClient, // Id_Cliente
                data.Name,     // Nombre
                data.lastNAme, // Apellido
                data.IdDoc,    // Cedula
                data.IdRif,    // RIF
                data.Age,      // Edad
                data.Address,  // direccion
                data.Email,    // Mail
                data.WhastApp, // WhastApp  
                data.UserName, // UserName
                data.PassWord, // PassWord
            ],
            respClient = await ClientAdd(dataClient)
        ;

        res.status(200).json({
            mensaje:respClient,
            recibido: data,
        });

    } catch(err) {
        res.status(500).send(`Error en el registro de datos: ${err}`);
    };

});

module.exports = router;