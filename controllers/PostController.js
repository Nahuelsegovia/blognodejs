const mongo = require('../database/connect');
let post = require('../database/models/Post');

class PostController{
    constructor(){}

static create(title, content, hashtag, user_id, res){

    let newPost = new post({
        title: title,
        content: content,
        hashtag: hashtag,
        user_id: user_id,
        post_date: Date.now()
    })

    newPost.save().then(() => {
        res.json({
            'status': `Post ${newPost.title} created successfully`
        })
        }).catch((error) => console.log(error));
    }
    
}


module.exports = PostController;