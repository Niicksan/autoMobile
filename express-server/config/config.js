const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        sessionCookieName: 'session-cookie', // Rename 'session-cookie' with a name you want to use
        sessionSecret: 'my-secret', // Rename 'my-secret' with a name you want to use
        isSessionSecure: false, // LocalLy you don't have https so it should be false
        sessionMaxAge: 24 * (60 * 60 * 1000), // 1 day of inactivity
        host: 'localhost',
        port: 3030, // You can use whatever port you want
        dbURL: 'mongodb://127.0.0.1:27017/my-project', // Rename 'my-project' with the name of your database
        domain: 'localhost',
        origin: ['http://localhost:3000']
    },
    production: {
        sessionCookieName: process.env.SESSION_COOKIE,
        sessionSecret: process.env.SESSION_SECRET,
        isSessionSecure: !!process.env.IS_SESSION_SECURE,
        sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE),
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        dbURL: process.env.DATABASE_URL,
        domain: process.env.DOMAIN,
        origin: [process.env.ORIGIN]
    }
};

module.exports = config[env];