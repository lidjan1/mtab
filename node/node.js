var app = require('http').createServer();
var io = require('socket.io')(app);
var repo = require('./modules/repo');

app.listen(80);


//var loginAndRegisterService = require('./modules/loginreg');

repo.initConnection('db2', function () {
    repo.CRUD.read('system_users', function (result) {
        //console.log(result);
        for(var i = 0;i<result.length;i++){
            console.log('ID = ' + result[i].id + '\n' + 'TYPE = ' + result[i].user_type + '\n');
        }
    })
});
