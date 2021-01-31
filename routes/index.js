var express = require('express');
var router = express.Router();
var app = express();
const bcrypt = require('bcrypt');
const RegisterController = require('../controllers/RegisterController');
const SearchUserController = require('../controllers/SearchUserController');
const PostController = require('../controllers/PostController');

router.get('/panel', function(req, res, next){
  res.render('index.html');
})

router.get('/login', function(req, res, next){
  res.render('login.html');
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
router.post('/register', async function(req, res, next) {
  let userDb = require('../database/models/User');
  let searchUser = await userDb.findOne({email: req.query.email});
  if(searchUser){
    res.send('User already exists');
  }

  else{
    let user = new RegisterController();
    let email = req.query.email;
    let password = req.query.password;
    let create = user.create(email, password, res);
  }
 
});

module.exports = router;
