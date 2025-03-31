Antes de ejecutar el archivo de inicio APp.js se debe crear en la ruta de Acceso dentro de la Carpeta SERVER un archivo .env con los siguientes datos:

## Datos de la Conexion de la Base de Datos de MongoDB
USER_MONGODB=(Ingresa su usuarios de MongonDB), 
KEY_MONGODB= Ingresa tu key mongo, 
CLOUSTER_OPERATIONS=@DB-Operaciones (Ingresa el nombre de tu clouester, el que utilice para este fue "@db-operaciones" que esta declarado en esta variable de entorno CLOUSTER_OPERATIONS), 
URI_MONGO=  Sustituye el resto de tu URI proporcionado por atlas debería ser similar a este (.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=).

## Definición de los puertos de la APP
PORT=3100

## Ejemplo de envio de Datos API Registro de Clientes
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

const resClient = await ClientAdd(dataClient);

## Ejemplo de envio de datos API Actualizar Clientes
const
    userName = 'Yguerra',
    dataClient = {
        Id_Cliente:'1',
        nombre:'papa',     // Nombre
        apellido:'queretaro', // Apellido
        cedula:16859785,    // Cedula
        RIF:'V16859785',    // RIF
        edad:18,      // Edad
        direccion:'La Guaira',  // direccion
        mail:'titoguerra@gmail.com',    // Mail
        whastApp:'+54-424-123-45-657', // WhastApp  
        usuario:'Yguerra', // UserName
        contraseña:'Tg1234*28', // PassWord
    },
    respClient = await updateClient(userName,dataClient)
;

res.status(200).send({
    mensaje:respClient.mensaje,
});