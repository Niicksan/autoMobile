const MongoStore = require('connect-mongo');

const config = require('./config');

const sessionConfig = {
    name: config.sessionCookieName, // The name of the session ID cookie to set in the response (and read from in the request).
    secret: config.sessionSecret, // This is the secret used to sign the session ID cookie
    resave: false, // Whether to save the session if it wasn't modified during the request
    rolling: true, // Whether to (re-)set cookie on every response
    saveUninitialized: false, // Whether to save empty sessions to the store
    cookie: {
        httpOnly: true, // Whether to set HttpOnly Set-Cookie attribute
        domain: config.domain, // Specifies the value for the Domain Set-Cookie attribute in th request
        secure: config.isSessionSecure, // Whether to set Secure Set-Cookie attribute in th request
        maxAge: config.sessionMaxAge, // Specifies the number (in milliseconds) to set the Expires Set-Cookie attribute
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
    },
    store: MongoStore.create({ // here you can persist you session in the DB, so when the server is restarted,it will not be lost
        mongoUrl: config.dbURL // DB connection string
    }),
};

module.exports = {
    sessionConfig,
};