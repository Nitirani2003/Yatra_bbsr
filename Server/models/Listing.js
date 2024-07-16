const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ListingSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true
    },
    operatingHours: {
        type: String,
        required: true
    },
    amenities: {
        type: Array,
        default: []
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    highlightDesc: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;