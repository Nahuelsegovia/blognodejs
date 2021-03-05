const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let user = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    sign_up_date: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('User', user);