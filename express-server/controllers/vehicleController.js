const multer = require('multer');
const vehicleController = require('express').Router();

const { check, validationResult } = require('express-validator');
const { createVehicle, deleteVehicleById, updateVehicle, getAllVehiclesCreatedByUser } = require('../services/vehicleService');
const { parseError } = require('../utils/errorParser');
const { hasUser, isOwner } = require('../middlewares/guards');
const preloader = require('../middlewares/preloader');

const imageUploadPath = './static/images/vehicles/';

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path = imageUploadPath; // Destination folder
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1]; // Get image extension
            let fileName = `${Date.now()}${Math.floor( // Generate random name
                Math.random() * 100
            )}.${ext}`;
            cb(null, fileName);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 10, // Max image size - 10MB
    },
}).single('imageFile'); // Field name in the request body containing image

vehicleController.get('/',
    hasUser(),
    async (req, res) => {
        try {
            const userId = req.session.user.id;
            const vehicles = await getAllVehiclesCreatedByUser(userId);

            return res.json(vehicles);
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            return res.status(400).json({ message });
        }
    }
);

vehicleController.get('/:vehicleId',
    preloader(),
    isOwner(),
    async (req, res) => {
        const vehicle = res.locals.vehicle;

        return res.json(vehicle);
    }
);

vehicleController.post('/',
    upload,
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('make').isLength({ min: 2 }).withMessage('Make name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    hasUser(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const vehicle = {
                ...req.body,
                imagePath: `/vehicles/${req.file.filename}`,
                ownerId: req.session.user.id,
            };

            const createdVehicle = await createVehicle(vehicle);
            return res.json(createdVehicle);
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            return res.status(400).json({ message });
        }
    }
);

vehicleController.patch('/:vehicleId',
    upload,
    check('vinNumber').isLength(17).withMessage('Vin Number must be 17 characters long'),
    check('make').isLength({ min: 2 }).withMessage('Make name must be at least 2 characters'),
    check('model').isLength({ min: 2 }).withMessage('Model name must be at least 2 characters'),
    check('engine').isLength({ min: 2 }).withMessage('Engine must be at least 2 characters'),
    check('fuel').isLength({ min: 2 }).withMessage('Fuel must be at least 2 characters'),
    check('yearOfManufacture').isInt({ min: 1920, max: new Date().getFullYear() }).withMessage('Year is not correct'),
    preloader(),
    isOwner(),
    async (req, res) => {
        const vehicle = res.locals.vehicle;

        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const vehicleToEdit = {
                ...req.body,
            };

            if (req.file) {
                vehicleToEdit.imagePath = `/vehicles/${req.file.filename}`;
            }

            const result = await updateVehicle(vehicle, vehicleToEdit);
            return res.json(result);
        } catch (error) {
            console.log(error);
            const message = parseError(error);
            console.error(message);
            return res.status(400).json({ message });
        }
    }
);

vehicleController.delete('/:vehicleId',
    preloader(),
    isOwner(),
    async (req, res) => {
        try {
            await deleteVehicleById(req.params.vehicleId);

            return res.status(200).json({
                message: "Item deleted successfully",
            });
        } catch (error) {
            const message = parseError(error);
            console.error(message);
            return res.status(400).json({ message });
        }
    }
);

module.exports = vehicleController;