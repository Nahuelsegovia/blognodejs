var express = require('express');
var app  = express();
var router = express.Router();
const PostController = require('../controllers/PostController');
const postModel = require('../database/models/Post');
const multer = require('multer');
var mongoose = require('mongoose');
var Jimp = require('jimp');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 10});

const storage = multer.diskStorage({

    destination: (req, res, callback) => {
        callback(null, './public/files');
    },
    filename: async (req, file, callback) => {
        let image = file.originalname;
        callback(null, Date.now()+ '_' +image.replace(/ /g, ""));
        
    }
})

const filefilter = (req, file, cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null, true)
    }    
}

const upload = multer({
    storage : storage,
    fileFilter: filefilter,
}); 


router.post('/image/upload', upload.single('formData'), async (req, res) => {
    console.log(req.file)
    const filepath = Date.now()+req.file.filename.replace(/ /g, "")
    const image = await Jimp.read(req.file.path)
    image.resize(600, 500) 
    .quality(90)
    .writeAsync(`./public/image_resize/${filepath}`)
    res.json({
        data: `![](http://localhost:3000/image_resize/${filepath})`
    })
})


/*Post area*/
router.post('/create/post', function(req, res, next){
    if(req.session.admin){
      let title = req.body.title;
      let content = req.body.content;
      let hashtag = req.body.hashtag;
      let user_id = req.session.user_id;
  
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
    if(myCache.has('result')){
        res.send(myCache.get('result'))
    }

    else{
        let posts = postModel.find({}, (err, result) =>{
            if(!result){
                res.status(400,).send({message: 'Upss, posts not found'});
            }
    
            else{
                myCache.set('result', result);
                res.send(result);
            }
        });
    }
})

router.get('/api/post/:id', function(req, res, next){
        let post = postModel.findById({_id : req.params.id}, (err, result) =>{

        if(!result){
            res.status(400,).send({message: 'Upss, post not found'});
        }

        else{
            res.send(result);
        }

    });
});


module.exports = router;