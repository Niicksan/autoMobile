const Vehicle = require("../models/Vehicle");


async function getAllVehiclesCreatedByUser(userId) {
    return Vehicle.find({ ownerId: userId }, { updatedAt: 0, __v: 0 }).sort({ createdAt: -1 });
};

async function getVehicleById(id) {
    return await Vehicle.findById(id, { updatedAt: 0, __v: 0 });
};

async function createVehicle(vehicle) {
    const { vinNumber } = vehicle;
    const existing = await Vehicle.findOne({ vinNumber }).collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('A vehicle with such a VIN number already exists');
    }

    return Vehicle.create(vehicle);
};

async function updateVehicle(vehicle, data) {
    const { vinNumber } = data;

    const existing = await Vehicle.findOne({ vinNumber }).collation({ locale: 'en', strength: 2 });

    if (existing && data.vinNumber !== vehicle.vinNumber) {
        throw new Error('A vehicle with such a VIN number already exists');
    }

    vehicle.vinNumber = data.vinNumber;
    vehicle.make = data.make;
    vehicle.model = data.model;
    vehicle.engine = data.engine;
    vehicle.fuel = data.fuel;
    vehicle.yearOfManufacture = data.yearOfManufacture;
    vehicle.description = data.description;
    vehicle.updatedAt = new Date().toISOString();

    if (data.imageUrl) {
        vehicle.imageUrl = data.imageUrl;
    }

    return vehicle.save();
};

async function deleteVehicleById(id) {
    return Vehicle.findByIdAndDelete(id);
};

module.exports = {
    getAllVehiclesCreatedByUser,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicleById
};