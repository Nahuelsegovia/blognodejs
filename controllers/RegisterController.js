const mongo = require('../database/connect');
let user = require('../database/models/User');
const bcrypt = require('bcrypt');

class RegisterController{
    constructor(){}

create(email, password, res){
    let hash = bcrypt.hashSync(password, 10);

    let usuario = new user({
        email: email,
        password: hash,
        sign_up_date: Date.now()
    })

    usuario.save().then(() => {
        res.send(usuario);
        }).catch((error) => console.log(error));
    }
}


module.exports = RegisterController;