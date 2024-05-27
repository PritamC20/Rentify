//Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    place: String,
    area: Number,
    bedrooms: Number,
    bathrooms: Number,
    nearby: [String],
    description: String,
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Property', propertySchema);
