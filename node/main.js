var app = require('http').createServer();
var repo = require('./modules/repo');
var loginModule = require('./modules/loginreg');
var io = require('socket.io')(app);
var adminModule = require('./modules/adminModule');
var clientModule = require('./modules/clientModule');
var courierModule = require('./modules/courierModule');

app.listen(81);

repo.initConnection('db', function () {
    io.on('connection', function (socket) {
        var userType;
        socket.on('login', function (response) {
            console.log(response.user, response.password);
            loginModule.loginUser(response.user, response.password, function (response) {
                 if(response){
                     var table;
                     userType = response.user_type;
                     console.log(response.user_type);
                     switch (response.user_type){
                         case 'admin':
                             table = 'administrators';
                             adminModule.adminHandlers(socket, userType);
                             break;
                         case 'client':
                             table = 'clients';
                             clientModule.clientHandlers(socket, userType, response.id);
                             break;
                         case 'courier':
                             table = 'couriers';
                             courierModule.courierHandlers(socket, userType, response.id);
                             break;
                         case 'manager':
                             table = 'managers';
                             break;
                     }
                     repo.CRUD.readWhere(table, 'id='  + '\'' + response.id + '\'', function (moreInfoResponse) {
                         var userInfoObj = moreInfoResponse[0];
                         userInfoObj.user_type = response.user_type;
                         socket.emit('login', userInfoObj);
                     });
                 } else {
                     socket.emit('login', response);
                 }
            });
        });
        socket.on('register', function (response) {

        });

    });
});
