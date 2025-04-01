const { connectDB, mongoose } = require('../../../components/config/config-mongo');
const Cliente = require('../../mongoDB/model/cliente');

const DeleteClientId = async (idClient) => {
    try {
        await connectDB();
        const respDelete = await Cliente.deleteOne({ Id_Cliente: idClient });
        console.log(respDelete);

        return {
            data: respDelete,
            mensage:`Se ha borrado el cliente sastifactoriamente`,
        };
    } catch(err) {
        return {
            data: null,
            mensage:`Hubo un error al intenta de eliminar el cliente ${err}`,
        };
    } finally {
        mongoose.connection.close();
    };
};

const DeleteClientUserName = async (UserName) => {
    try {
        await connectDB();
        const respDelete = await Cliente.deleteOne({ usuario: UserName });
        console.log(respDelete);

        return {
            data: respDelete,
            mensage:`Se ha borrado el cliente sastifactoriamente`,
        };
    } catch(err) {
        return {
            data: null,
            mensage:`Hubo un error al intenta de eliminar el cliente ${err}`,
        };
    } finally {
        mongoose.connection.close();
    };
};

module.exports = {
    DeleteClientId,
    DeleteClientUserName,
};