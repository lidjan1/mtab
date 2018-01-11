var repo = require('./modules/repo');
var loginAndRegisterService = require('./modules/loginreg');

repo.initConnection('db', function () {
    repo.CRUD.read('user', function (result) {
        console.log(result);
    })
});
