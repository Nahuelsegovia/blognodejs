const mongo = require('../database/connect');
let user = require('../database/models/User');
const bcrypt = require('bcrypt');

class SearchUserController{
    constructor(){}

    static async userLogin(email, password, res, req){
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
               req.session.admin = true;
               req.session.user_id = userByEmail._id;
               res.json({
                   status: 'Authenticated',
               })
            }
        }
    }

}


module.exports = SearchUserController;