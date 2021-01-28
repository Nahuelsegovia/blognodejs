var express = require('express');
var router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const SearchUserController = require('../controllers/SearchUserController');
const tokenVerify = require('../middlewares/TokenVerify');
let user = new RegisterController();
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next){
  res.render('index.html');
})

router.post('/login', async function(req, res, next){
  let useremail = SearchUserController.userLogin(req.query.email, req.query.password, res);
})

router.post('/register', function(req, res, next) {
  let email = req.query.email;
  let password = req.query.password;
  let create = user.create(email, password, res);
});


router.post('/probar', tokenVerify, function(req, res, next){
  res.send('Hola papaa');
});
module.exports = router;
