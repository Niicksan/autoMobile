const cors = require('cors');
const express = require('express');
const config = require('./config');
const session = require('express-session');
const trimBody = require('../middlewares/trimBody');
const { parseError } = require('../utils/errorParser');
const { sessionConfig } = require('./session-config');

module.exports = (app) => {
    // Setup the body parser
    app.use(express.json({
        verify: (req, res, buf, encoding) => {
            try {
                JSON.parse(buf);
            } catch (error) {
                const message = parseError(error);
                console.error(message);
                return res.status(400).json({ message: "Invalid data format" });
            }
        }
    }));

    // It parses incoming requests with urlencoded payloads
    app.use(express.urlencoded({ extended: true }));

    // Setup the static files
    app.use('/static', express.static('static'));

    // Setup CORS
    app.use(cors({
        origin: [config.origin],
        methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }));

    // Setup session
    app.use(session(sessionConfig));

    // Trim empty spaces before and after input value, except for password
    app.use(trimBody('password'));
};