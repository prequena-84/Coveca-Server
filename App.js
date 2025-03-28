const express = require('express');
const servidor = express();
const cors = require('cors');
const { PORT } = require('./config-app');
const CUSTOMER_REGISTRATION = require('./src/api/insert/insert-client');

servidor.use(cors());

servidor.all("/", (req, res) => {
    res.send('Bienvenido a la App de WhastApp de COVECA, CA');
});

servidor.use("/api-customer-registration", CUSTOMER_REGISTRATION);

servidor.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});