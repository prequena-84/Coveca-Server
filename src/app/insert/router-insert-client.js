const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const ClientAdd = require('../../components/module/insert/insert-client');

router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try {
        res.status(200).send({
            mensaje:'Servicio de Registro de Clientes',
        });
    } catch(err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        });
    };
});

// Metodo para registro de cliente
router.post("/registro", async (req, res) => {
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
            recibido:respClient.data,
            mensaje:respClient.mensaje,
        });
    } catch(err) {
        res.status(500).send({
            recibido:null,
            mensaje:`Error en el registro de datos: ${err}`,
        });
    };
});

module.exports = router;