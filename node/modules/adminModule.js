var repo = require('./repo');

exports.adminHandlers = function (socket, userType) {
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
    socket.on('editCar', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log('Editing car...', response);
            var setQuery = 'Registration_number =' + '\'' + response.Registration_number + '\', ' +
                'Year_of_production =' + '\'' + response.Year_of_production + '\', ' +
                'Technical_condition =' + '\'' + response.Technical_condition + '\', ' +
                'Type =' + '\'' + response.Type + '\'';

            var whereQuery = 'Registration_number =' + '\'' + response.Old_Reg + '\'';
            repo.CRUD.updateWhere('cars', setQuery, whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    car: response
                };
                socket.emit('editCar', dataObj);
            });
        }
    });
    socket.on('deleteCar', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log('Deleting car...', response);
            var whereQuery = 'Registration_number =' + '\'' + response + '\'';

            repo.CRUD.deleteWhere('cars', whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    Old_Reg: response
                };
                socket.emit('deleteCar', dataObj);
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
};