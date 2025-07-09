const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);