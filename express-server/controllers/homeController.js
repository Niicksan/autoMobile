const homeController = require('express').Router();


homeController.get('/', (req, res) => {
    res.send('<h1> REST Service is running!</h1>');
});

module.exports = homeController;