const profileController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getUserInfo } = require('../services/userService');
const { parseError } = require('../utils/errorParser');


profileController.get('/user-info', hasUser(), async (req, res) => {
    try {
        console.log(req.session.user);
        const user = await getUserInfo(req.session.user.id);

        return res.json(user);
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(400).json({ message });
    }
});

module.exports = profileController;