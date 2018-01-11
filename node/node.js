var repo = require('./modules/repo');

repo.initConnection('db', function () {
    repo.CRUD.read('user', function (result) {
        console.log(result);
    })
});
