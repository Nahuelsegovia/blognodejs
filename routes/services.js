var express = require('express');
var router = express.Router();
const PostController = require('../controllers/PostController');
let postModel = require('../database/models/Post');

/*Post area*/
router.post('/create/post', function(req, res, next){
    if(req.session.admin){
      let title = req.body.title;
      let content = req.body.content;
      let user_id = req.body.user_id;
      let hashtag = req.body.hashtag;
  
      let posteo = PostController.create(title, content, hashtag, user_id, res);
      return posteo;
    }
  
    else{
      res.status(403).send({message: 'Upss, Forbidden'})
    }
  
  })

  router.post('/delete/post/:id', function(req, res, next){
    if(req.session.admin){
        let post = postModel.remove({_id:req.params.id}, (err) => {
            if(err){
                res.status(400,).send({message: 'Upss, post not found'});
            }
    
            else{
                res.json({
                    status: '200',
                    message: `post ${req.params.id} deleted`,
                });
            }
        });
    }
  
    else{
      res.status(403).send({message: 'Upss, Forbidden'})
    }
  
  })

router.get('/post/all', function(req, res, next){
    let posts = postModel.find({}, (err, result) => {
        if(err){
            res.status(400,).send({message: 'Upss, posts not found'});
        }

        else{
            res.send(result);
        }
    })
})

router.get('/post/:id', function(req, res, next){
    let post = postModel.findById(req.params.id, (err, result) => {
        if(err){
            res.status(400,).send({message: 'Upss, post not found'});
        }

        else{
            res.send(result);
        }
    } );
});

module.exports = router;