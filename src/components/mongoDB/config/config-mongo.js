const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname,'../../../../.env') });
const uriMongoDB = `mongodb+srv://${process.env.USER_MONGODB}:${process.env.KEY_MONGODB}${process.env.URI_MONGO}${process.env.CLOUSTER_OPERATIONS}`;

mongoose.connect(uriMongoDB);
const db = mongoose.connection;
const { Schema, model } = mongoose;

module.exports = { 
    mongoose,
    db, 
    Schema, 
    model,
};