var repo = require('./repo');
var passwordHash = require('./lib/password-hash');

exports.registerUser = function (user, password, callback) {
    repo.CRUD.readWhere('user', 'login=' + user, function (result) {
        //TODO sprawdzic czy user jest już w bazie. Dodac biblioteke do hashowania hasel
    });
};

exports.loginUser = function (user, password, callback) {
    repo.CRUD.readWhere('user', 'login=' + user, function (result) {
        /*
       if(result){
           if(passwordHash.verify(password, result.password)){
               //
           } else {
               //
           }
       }*/
    });
};

exports.changePassword = function (user, oldPassword, newPassword, callback) {
    repo.CRUD.readWhere('user', 'login='+user, function (result) {
        //
    })
};