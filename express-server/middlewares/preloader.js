const { getVehicleById } = require("../services/vehicleService");
const { parseError } = require("../utils/errorParser");


module.exports = () => async (req, res, next) => {
    try {
        res.locals.vehicle = await getVehicleById(req.params.vehicleId);

        if (res.locals.vehicle === null) {
            throw new Error("Item doesn't exist");
        }
    } catch (error) {
        const message = parseError(error);
        console.error(message);
        return res.status(404).json({
            message: "Item doesn't exist",
        });
    }

    next();
};