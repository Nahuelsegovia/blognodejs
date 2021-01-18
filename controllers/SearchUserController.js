const mongo = require('../database/connect');
let user = require('../database/models/User');
const bcrypt = require('bcrypt');

class SearchUserController{
    constructor(){}

    static async userLogin(email, password, res){
        let userByEmail = await user.findOne({email : email});
        if(userByEmail){
           let showuser = await bcrypt.compare(password, userById.password);
           res.send(showuser);
        }

        else{
            res.json({'message': 'user not found'});
        }
    }

}


module.exports = SearchUserController;