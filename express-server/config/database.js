const mongoose = require('mongoose');
const config = require('./config');


module.exports = async () => {
    try {
        // Connect to MongoDB
        mongoose.set('strictQuery', true); // Only the fields that are specified in your Schema will be saved in the database
        await mongoose.connect(config.dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Error initializing database');
        console.error(error.message);
        process.exit(1);
    }
};