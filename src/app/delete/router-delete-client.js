const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');

const { DeleteClientId, DeleteClientUserName } = require('../../components/module/delete/delete-client');

router.use(bodyParse.json());

router.get("/", async (req,res) => {
    try {
        res.status(200).send({
            mensaje:'Servicio para eliminar Clientes',
        });
    } catch(err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        });
    };
});

// Metodo para eliminar cliente por ID
router.post("/eliminar-cliente-ID", async (req, res) => {
    try {
        const 
            data = req.body, 
            respDelete = DeleteClientId(data.IdClient)
        ;

        res.status(200).json({
            recibido:respDelete.data,
            mensaje:respDelete.mensaje,
        });
    } catch(err) {
        res.status(500).send({
            recibido:null,
            mensaje:`Error en la eliminación de datos: ${err}`,
        });
    };
});

// Metodo para eliminar cliente por usuario
router.post("/eliminar-cliente-username", async (req, res) => {
    try {

        const 
            data = req.body,
            respDelete = DeleteClientUserName(data.UserName)
        ;

        res.status(200).json({
            recibido:respDelete.data,
            mensaje:respDelete.mensaje,
        });
    } catch(err) {
        res.status(500).send({
            recibido:null,
            mensaje:`Error en la eliminación de datos: ${err}`,
        });
    };
});