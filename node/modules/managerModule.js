var repo = require('./repo');

exports.managerHandlers = function (socket, userType, userID) {
    socket.on('managerSelectCourier', function (response) {
        if(userType !== 'manager' || userID !== response.id){
            socket.emit('managerGetData', 'You are not logged in as manager!');
        } else {
            var setQuery = 'Courier_id =' + '\'' + response.Courier_id + '\'';
            var whereQuery = 'Package_id =' + '\'' + response.Package_id + '\'';

            repo.CRUD.updateWhere('orders', setQuery, whereQuery, function (dbResponse) {
                socket.emit('managerSelectCourier', dbResponse);
            });
        }
    });
    socket.on('managerEditCarStatus', function (response) {
        if(userType !== 'manager' || userID !== response.id){
            socket.emit('managerGetData', 'You are not logged in as manager!');
        } else {
            var setQuery = 'Technical_condition =' + '\'' + response.car.Technical_condition + '\'';
            var whereQuery = 'Registration_number =' + '\'' + response.car.Registration_number + '\'';

            repo.CRUD.updateWhere('cars', setQuery, whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    car: response.car
                };
                socket.emit('managerEditCarStatus', dataObj);
            });
        }
    });
    socket.on('managerGetData', function (response) {
        if(userType !== 'manager' || userID !== response.id){
            socket.emit('managerGetData', 'You are not logged in as manager!');
        } else {
            var dataObj = {};
            var dataCounter = 0;
            repo.CRUD.readWhere('managers', 'id='  + '\'' + userID + '\'' ,function (response) {
                dataObj.userData = response[0];
                dataCounter++;
            });
            repo.CRUD.read('orders', function (response) {
                dataObj.ordersData = response;
                dataCounter++;
            });
            repo.CRUD.read('couriers', function (response) {
                dataObj.couriersData = response;
                dataCounter++;
            });
            repo.CRUD.read('clients', function (response) {
                dataObj.clientsData = response;
                dataCounter++;
            });
            repo.CRUD.read('package', function (response) {
                dataObj.packageData = response;
                dataCounter++;
            });
            repo.CRUD.read('cars', function (response) {
                dataObj.carsData = response;
                dataCounter++;
            });

            var counterInterval = setInterval(function(){
                if(dataCounter === 6){
                    socket.emit('managerGetData', dataObj);
                    clearInterval(counterInterval);
                }
            }, 250);
        }
    });
};
