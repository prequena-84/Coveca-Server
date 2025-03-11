const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname,'./.env') });

const PORT = process.env.PORT || 3000;

module.exports = {
    PORT,
};