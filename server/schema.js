// schema.js
const mongoose = require('mongoose');

// General User Schema
const userSchema = new mongoose.Schema({
    accountType: { type: String, enum: ['user', 'psychologist', 'admin'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Certified Psychologist Schema
const psychologistSchema = new mongoose.Schema({
    accountType: { type: String, enum: ['psychologist'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    degreeUpload: { type: String }, // Path to degree image
    rciUpload: { type: String }, // Path to RCI certificate image (optional)
    rciNumber: { type: String }, // RCI certificate number (optional)
    professionalOrg: { type: String, required: true },
});

// Admin Schema
const adminSchema = new mongoose.Schema({
    accountType: { type: String, enum: ['admin'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminPasskey: { type: String, required: true },
});

// Export models
module.exports = {
    User: mongoose.model('User', userSchema),
    Psychologist: mongoose.model('Psychologist', psychologistSchema),
    Admin: mongoose.model('Admin', adminSchema),
};