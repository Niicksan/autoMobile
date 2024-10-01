const { Schema, model, Types } = require("mongoose");


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    imageUrl: { type: String, required: true, default: 'default-profile.png' },
    vehicles: { type: [Types.ObjectId], ref: 'Vehicle', default: [] },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] },
    createdAt: { type: String, required: true, default: () => (new Date().toISOString()) },
    updatedAt: { type: String, required: true, default: () => (new Date().toISOString()) }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;