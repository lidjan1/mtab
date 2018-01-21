var app = require('http').createServer();
var repo = require('./modules/repo');
var loginModule = require('./modules/loginreg');
var io = require('socket.io')(app);

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
                     switch (response.user_type){
                         case 'admin':
                             table = 'administrators';
                             break;
                         case 'client':
                             table = 'clients';
                             break;
                         case 'courier':
                             table = 'couriers';
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
        socket.on('addNewCar', function (response) {
            if(userType !== 'admin'){
                socket.emit('adminGetData', 'You are not logged in as administrator!');
            } else {
                console.log('Adding new car...', response);
                var carObj = {
                    Registration_number: response.newCarReg,
                    Year_of_production: response.newCarYear,
                    Technical_condition: response.newCarCondition,
                    Type: response.newCarType,
                };
                repo.CRUD.create('cars', carObj, function (dbResponse) {
                    var dataObj = {
                        response: dbResponse,
                        car: carObj
                    };
                    socket.emit('addNewCar', dataObj);
                });
            }
        });
        socket.on('adminGetData', function () {
            if(userType !== 'admin'){
                socket.emit('adminGetData', 'You are not logged in as administrator!');
            } else {
                var dataObj = {};
                var dataCounter = 0;
                repo.CRUD.read('clients', function (response) {
                    dataObj.clientsData = response;
                    dataCounter++;
                });
                repo.CRUD.read('couriers', function (response) {
                    dataObj.couriersData = response;
                    dataCounter++;
                });
                repo.CRUD.read('managers', function (response) {
                    dataObj.managersData = response;
                    dataCounter++;
                });
                repo.CRUD.read('cars', function (response) {
                    dataObj.carsData = response;
                    dataCounter++;
                });
                repo.CRUD.read('orders', function (response) {
                    dataObj.ordersData = response;
                    dataCounter++;
                });
                repo.CRUD.read('package', function (response) {
                    dataObj.packageData = response;
                    dataCounter++;
                });
                repo.CRUD.read('users', function (response) {
                    dataObj.usersData = [];
                    for(var i = 0;i<response.length;i++){
                        dataObj.usersData.push({
                            id: response[i].id,
                            user_type: response[i].user_type,
                            login: response[i].login
                        });
                    }
                    dataCounter++;
                });
                var counterInterval = setInterval(function(){
                    if(dataCounter === 7){
                        socket.emit('adminGetData', dataObj);
                        clearInterval(counterInterval);
                    }
                }, 250);
            }
        });
    });
});
