var express = require('express');
var router = express.Router();
var app = express();
const bcrypt = require('bcrypt');
const RegisterController = require('../controllers/RegisterController');
const SearchUserController = require('../controllers/SearchUserController');
const PostController = require('../controllers/PostController');

router.get('/user', function(req, res, next){
  res.render('index.html', {'name': 'caca'})//req.params.name});
})


/*User's login & logout*/
router.post('/login', async function(req, res, next){
    let useremail = SearchUserController.userLogin(req.body.email, req.body.password, res, req);
    return useremail;
})

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/user');
})


/*Register area*/
router.post('/register', function(req, res, next) {
  let user = new RegisterController();
  let email = req.query.email;
  let password = req.query.password;
  let create = user.create(email, password, res);
});



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
    res.send('sin permiso');
  }

})

module.exports = router;
