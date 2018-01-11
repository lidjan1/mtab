var repo = require('./repo');

exports.registerUser = function (user, password, callback) {
    repo.CRUD.read('user', function (result) {
        //TODO sprawdzic czy user jest już w bazie. Dodac biblioteke do hashowania hasel
    });
};

exports.loginUser = function (user, password, callback) {
    repo.CRUD.read('user', function (result) {
       //
    });
};