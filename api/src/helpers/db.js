/* For MongoDb Connection */
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const  connectToDatabase = () => {
    mongoose.connect(
        process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            poolSize: 50,
            useUnifiedTopology:true
            // useMongoClient: true
        }
    );

    mongoose.connection.on('connected', () => {
        console.log('Connection Established');

    });

    mongoose.connection.on('reconnected', () => {
        console.log('Connection Reestablished');

    });

    mongoose.connection.on('disconnected', () => {
        console.log('Connection Disconnected');

    });

    mongoose.connection.on('close', () => {
        console.log('Connection Closed');

    });

    mongoose.connection.on('error', (error) => {
        console.log('ERROR: ' + error);

    });



}

module.exports = connectToDatabase
