const jwt = require('jsonwebtoken');


const tokenVerify = (req, res, next) => {
    const token = req.headers['authorization'].replace(/^JWT\s/, '');
    if(!token){
        res.send('Invalid token');
    }

    else{
      jwt.verify(token, 'llavecitaenlapancita', function(err, decoded){
        next();
      })
    }
  }

  module.exports  = tokenVerify;