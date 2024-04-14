const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log('Connection with Database Successful') })
        .catch((err) => {
            console.log(err);

        })
}