function hasUser() {
    return (req, res, next) => {
        if (req.session.user) {
            next();
        } else {
            return res.status(401).json({
                message: 'Please log in',
            });
        }
    };
};

function isGuest() {
    return (req, res, next) => {
        if (!req.session.user) {
            next();
        } else {
            return res.status(400).json({
                message: 'You are already logged in',
            });
        }
    };
};

function isOwner() {
    return (req, res, next) => {
        if (req.session.user && res.locals.vehicle.ownerId == req.session.user.id) {
            res.locals.isOwner = true;
            next();
        } else {
            return res.status(403).json({
                message: "Access denied! You don't have rights to access this page!",
            });
        }
    };
};

module.exports = {
    hasUser,
    isGuest,
    isOwner
};