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
  let email = req.query.email;
  let password = req.query.password;
  let create = user.create(email, password, res);
});


router.post('/probar', tokenVerify, function(req, res, next){
  res.send('Hola, estamos seguros de que sos el usuario, podes usar esta ruta.');
});

/*Post area*/
router.post('/create/post', tokenVerify, function(req, res, next){
  if(req.session.admin){
    let title = req.body.title;
    let content = req.body.content;
    let user_id = req.body.user_id;
    let hashtag = req.body.hashtag;

    let posteo = PostController.create(title, content, hashtag, user_id, res);
    return posteo;
  }

  else {
    res.status(403, 'Forbidden');
  }
  
})
module.exports = router;
