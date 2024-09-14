const { Schema, model, Types } = require("mongoose");


const vehicleSchema = new Schema({
    vinNumber: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    engine: { type: String, required: true },
    fuel: { type: String, required: true },
    yearOfManufacture: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ownerId: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: String, required: true, default: () => (new Date().toISOString()) },
    updatedAt: { type: String, required: true, default: () => (new Date().toISOString()) }
});

vehicleSchema.index({ vinNumber: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

vehicleSchema.index({ make: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

vehicleSchema.index({ model: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Vehicle = model('Vehicle', vehicleSchema);

module.exports = Vehicle;