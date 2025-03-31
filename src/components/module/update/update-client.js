const { connectDB, mongoose } = require('../../config/config-mongo');
const Cliente = require('../../mongoDB/model/cliente');

const updateClient = async(userName, dataClient) => {
    try{
        await connectDB();
        return await Cliente.updateDataClient(userName, dataClient);
    } catch(err) {
        return `Error en la actualización de datos del Cliente: ${err}`;
    } finally {
        mongoose.connection.close();
    };
};

module.exports = updateClient;