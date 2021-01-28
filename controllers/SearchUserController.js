const mongo = require('../database/connect');
let user = require('../database/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class SearchUserController{
    constructor(){}

    static async userLogin(email, password, res){
        let userByEmail = await user.findOne({email : email});
        if(!userByEmail){
            res.json({'message': 'user not found'});
        }

        else{
            let userPassword = await bcrypt.compare(password, userByEmail.password);
            if(!userPassword){
                res.json({'message': 'incorrect password'})
            }

            else{
               const payload = {
                   check: true
               } 
               const token = jwt.sign(payload, 'llavecitaenlapancita', {
                expiresIn: 1440
               });

               res.json({
                   'message': 'Authenticated - 200',
                   'token': token
               })
            }
        }
    }

}


module.exports = SearchUserController;