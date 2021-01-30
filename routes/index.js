var express = require('express');
var router = express.Router();
const RegisterController = require('../controllers/RegisterController');
const SearchUserController = require('../controllers/SearchUserController');
const tokenVerify = require('../middlewares/TokenVerify');
let user = new RegisterController();
const bcrypt = require('bcrypt');
const { use } = require('passport');

router.get('/user/:name', function(req, res, next){
  res.render('index.html', {'name': req.params.name});
})

router.post('/login', async function(req, res, next){
  let useremail = SearchUserController.userLogin(req.body.email, req.body.password, res);
  return useremail;
})

router.get('/login', function(req, res, next){
  res.render('login.html');
})

router.post('/register', function(req, res, next) {
  let email = req.query.email;
  let password = req.query.password;
  let create = user.create(email, password, res);
});


router.post('/probar', tokenVerify, function(req, res, next){
  res.send('Hola, estamos seguros de que sos el usuario, podes usar esta ruta.');
});
module.exports = router;
