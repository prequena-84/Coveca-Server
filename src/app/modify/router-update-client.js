const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const updateClient = require('../../components/module/cliente/actualizar/update-client');

router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try {
        res.status(200).send({
            mensaje:'Servicio de Actualización de datos de Clientes',
        });
    } catch(err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        });
    };
});

router.post("/actualizacion", async (req, res) => {
    try {
        const 
            data = req.body,
            userName = data.usuario,
            dataClient = {
                nombre:data.Name,         // Nombre
                apellido:data.lastNAme,   // Apellido
                cedula:data.IdDoc,        // Cedula
                RIF:data.IdRif,           // RIF
                edad:data.Age,            // Edad
                direccion:data.Address,   // direccion
                mail:data.Email,          // Mail
                whastApp:data.WhastApp,   // WhastApp  
                usuario:data.UserName,    // UserName
                contraseña:data.PassWord, // PassWord
            },
            respClient = await updateClient(userName,dataClient)
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