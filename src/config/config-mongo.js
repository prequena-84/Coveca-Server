require('dotenv').config({ path: '../.env' });
//const mongoose = require('mongoose');
const uriMongo = process.env.DB_URI_MONGO; //`"${process.env.DB_URI_MONGO}"`;

//console.log(uriMongo);

/*mongoose.connect(uriMongo);
const db = mongoose.connection;
const { Schema } = mongoose;*/

module.exports = { 
    //mongoose,
    //db, 
    //Schema, 
};