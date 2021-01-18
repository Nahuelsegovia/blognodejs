const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let user = mongoose.Schema({
    email: String,
    password: String,
    sign_up_date: Date,
    id: Number,
})

module.exports = mongoose.model('User', user);