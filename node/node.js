var app = require('http').createServer();
var io = require('socket.io')(app);
var repo = require('./modules/repo');
var loginModule = require('./modules/loginreg');

app.listen(80);


//var loginAndRegisterService = require('./modules/loginreg');

repo.initConnection('db', function () {
    /*repo.CRUD.read('users', function (result) {
        console.log(result);
    });*/
    loginModule.loginUser('User4', 'clientTest4', function (result) {
         if(result){

         }
    });
    /*loginModule.registerUser('User11', 'abc123', 'client', function (result) {
        console.log(result);
    });*/
});
