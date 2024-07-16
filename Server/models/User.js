const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        required: true,
        type: String
    },
    profileImagePath: {
        type: String,
        default: "",
    },
    wishList: {
        type: Array,
        default: [],
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;