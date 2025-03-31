const express = require('express');
const servidor = express();
const cors = require('cors');
const { PORT } = require('./config-app');
const CUSTOMER_REGISTRATION = require('./src/app/insert/router-insert-client');
const CUSTOMRT_UPDATE = require('./src/app/modify/router-update-client');

servidor.use(cors());

servidor.all("/", (req, res) => {
    res.send('Bienvenido a la App de WhastApp de COVECA, CA');
});

// Servicio Cliente
servidor.use("/api-customer-registration", CUSTOMER_REGISTRATION);
servidor.use("/api-customer-update", CUSTOMRT_UPDATE);

// Quede en incluir los servicios de consulta y eliminacion del modulo de clientes

servidor.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});