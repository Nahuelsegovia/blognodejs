var express = require('express');
var router = express.Router();
var app = express();
const RegisterController = require('../controllers/RegisterController');
const SearchUserController = require('../controllers/SearchUserController');
const PostController = require('../controllers/PostController');

const tokenVerify = require('../middlewares/TokenVerify');
let user = new RegisterController();
const bcrypt = require('bcrypt');

router.get('/user', function(req, res, next){
  req.session.admin = true;
  res.render('index.html', {'name': 'caca'})//req.params.name});
})


/*User's login*/
router.post('/login', async function(req, res, next){
  if(req.session.admin){
    let useremail = SearchUserController.userLogin(req.body.email, req.body.password, res);
    return useremail;
  }

  else{
    res.send('no tenes permiso papa')
  }

})

router.get('/login', function(req, res, next){
  req.session.destroy();
  res.render('login.html');
})


/*Register area*/
router.post('/register', function(req, res, next) {
  let email = req.query.email;
  let password = req.query.password;
  let create = user.create(email, password, res);
});


router.post('/probar', tokenVerify, function(req, res, next){
  res.send('Hola, estamos seguros de que sos el usuario, podes usar esta ruta.');
});

/*Post area*/
router.post('/create/post', tokenVerify, function(req, res, next){
  let title = req.body.title;
  let content = req.body.content;
  let user_id = req.body.user_id;
  let hashtag = req.body.hashtag;

  let post = PostController.create(title, content, hashtag, user_id, res)
  return post;
})
module.exports = router;
