const mongoose = require('mongoose');

let post = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    hashtag:{
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    },
    post_date: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Post', post);