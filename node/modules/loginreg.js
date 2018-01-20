var repo = require('./repo');
var passwordHash = require('password-hash');

exports.registerUser = function (user, password, userType, callback) {
    repo.CRUD.readWhere('users', 'login=' + user, function (result) {
        if(result.length){
            callback(false);
        } else {
            repo.CRUD.create('users', {login: user, password: password, user_type: userType}, function (result) {
                console.log(result);
            });
        }
    });
};

exports.loginUser = function (user, password, callback) {
    repo.CRUD.readWhere('users', 'login=' + '\'' + user + '\'', function (result) {
        if(result.length){
            if(result[0].password === password){
                var userInfo = {
                    id: result[0].id,
                    user_type: result[0].user_type
                };
                callback(userInfo);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
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