const authController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { sessionCookieName } = require('../config/config');
const { isGuest } = require('../middlewares/guards');
const { register, login, } = require('../services/authService');
const { parseError } = require('../utils/errorParser');


authController.post('/register',
    isGuest(),
    check('email').isEmail().withMessage('Invalid email'),
    check('name').isLength({ min: 2 }).withMessage('Invalid name'),
    check('password').isLength({ min: 5 })
        .withMessage('Passwords must be at least 5 characters long')
        .escape(),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match');
        }

        return true;
    }),

    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const userInfo = await register(req.body.email, req.body.name, req.body.password);

            req.session.user = userInfo;
            return res.status(200).json({ user: userInfo });
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            return res.status(400).json({ message });
        }
    }
);

authController.post('/login', isGuest(), async (req, res) => {
    try {
        const userInfo = await login(req.body.email, req.body.password);

        req.session.user = userInfo;
        return res.status(200).json({ user: userInfo });
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return  res.status(400).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
        return res.clearCookie(sessionCookieName)
            .status(200)
            .send({
                message: 'Logged out!',
            });
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

module.exports = authController;