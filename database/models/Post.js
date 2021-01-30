const mongoose = require('mongoose');

let post = mongoose.Schema({
    title: {
        type: String,
    },
    content:{
        type: String,
    },
    post_date: Date,
    id: Number,
    user_id: Number,
})

module.exports = mongoose.model('Post', post);