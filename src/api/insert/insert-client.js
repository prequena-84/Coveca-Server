const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const ClientAdd = require('../../components/clientes/registro-cliente');

router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try{
        const dataClient = [
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

        await ClientAdd(dataClient);

        res.status(200).send({
            mensaje:'Api de servicio para registro de clientes'
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
        const data = req.body;
        //console.log(data);

        await ClientAdd(data);
        res.status(200).json({
            mensaje:'Se resgistro el cliente sastifactoriamente',
            recibido: data,
        });

    } catch(err) {
        res.status(500).send(`Error en el registro de datos: ${err}`);
    };

});

module.exports = router;