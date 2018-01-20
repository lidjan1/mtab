var repo = require('./repo');

exports.registerUser = function (user, password, callback) {
    repo.CRUD.readWhere('system_users', 'login=' + user, function (result) {
        //TODO sprawdzic czy user jest już w bazie. Dodac biblioteke do hashowania hasel
    });
};

exports.registerAdmin = function (user, password, callback) {
    repo.CRUD.readWhere('system_users', 'login=' + user, function (result) {
        //TODO sprawdzic czy user jest już w bazie. Dodac biblioteke do hashowania hasel
    });
};

exports.registerEmployee = function (user, password, callback) {
    repo.CRUD.readWhere('system_users', 'login=' + user, function (result) {
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