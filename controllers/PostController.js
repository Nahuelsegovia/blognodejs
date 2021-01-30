const mongo = require('../database/connect');
let post = require('../database/models/Post');
const bcrypt = require('bcrypt');

class PostController{
    constructor(){}

static create(title, content, hashtag, user_id, res){

    let post = new post({
        title: title,
        content: content,
        hashtag: hashtag,
        user_id: user_id,
        post_date: Date.now()
    })

    post.save().then( () => {
        res.json({
            message: `post ${post.title} created successfully`
        })
    })
    
    }
}


module.exports = PostController;