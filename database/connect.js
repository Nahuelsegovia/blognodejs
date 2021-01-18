const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let con = mongoose.connect(
    'mongodb://localhost:27017/midb',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log('Conectado a la db!');
    }).catch((err) => console.log(err));


module.exports = con;