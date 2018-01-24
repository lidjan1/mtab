var repo = require('./repo');

exports.adminHandlers = function (socket, userType) {
    socket.on('editOrder', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            var setQuery = 'Package_id =' + '\'' + response.order.Package_id + '\', ' +
                'Client_id =' + '\'' + response.order.Client_id + '\', ' +
                'Courier_id =' + '\'' + response.order.Courier_id + '\'';

            var whereQuery = 'Package_id =' + '\'' + response.oldOrder.Package_id + '\'';

            repo.CRUD.updateWhere('orders', setQuery, whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    order: response.order
                };
                socket.emit('editOrder', dataObj);
            });
        }
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

    socket.on('addNewUser', function (response) {
        if(userType != 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log( 'Adding new user...',response);

            var type = response.newUserType;

            var UserObj = {
                id : '',
                user_type: type,
                login: response.newUserLogin,
                password : response.newUserPassword
            };


            repo.CRUD.create('users', UserObj, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    package: UserObj
                };
                var usersData;
                var whereQuery = 'login='  + '\'' + response.newUserLogin + '\'';
                repo.CRUD.readWhere('users', whereQuery, function (response2) {
                    usersData = response2[0];
                    var ClientsObj = {
                        id : usersData.id,
                        Name: response.newUserName,
                        Surname: response.newUserSurname,
                        Adress: response.newUserAddress,
                        Packages_received: 0
                    };

                    var workerObj = {
                        id: usersData.id,
                        Name: response.newUserName,
                        Surname: response.newUserSurname
                    };
                    console.log(workerObj);
                    if ( type == 'client'){
                        repo.CRUD.create('clients', ClientsObj, function (dbResponse) {
                            var dataObj = {
                                response: dbResponse,
                                user: UserObj,
                                client: ClientsObj
                            };
                            socket.emit('addNewUser', dataObj);
                        });
                    } else if ( type == 'manager'){
                        repo.CRUD.create('managers', workerObj, function (dbResponse) {
                            var dataObj = {
                                response: dbResponse,
                                user: UserObj,
                                manager: workerObj
                            };
                            socket.emit('addNewUser', dataObj);
                        });
                    } else if ( type == 'courier'){
                        repo.CRUD.create('couriers', workerObj, function (dbResponse) {
                            var dataObj = {
                                response: dbResponse,
                                user: UserObj,
                                courier: workerObj
                            };
                            socket.emit('addNewUser', dataObj);
                        });
                    } else {
                        repo.CRUD.create('administrators', workerObj, function (dbResponse) {
                            var dataObj = {
                                response: dbResponse,
                                package: workerObj
                            };
                            socket.emit('addNewUser', dataObj);
                        });
                    }
                });
                console.log(usersData);
            });

        }
    })

    socket.on('deleteUser', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log('Deleting user...', response);
            var whereQuery = 'id =' + '\'' + response + '\'';
            repo.CRUD.deleteWhere('users', whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    userId: response
                };
            });
            repo.CRUD.deleteWhere('clients', whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    userId: response
                };
                socket.emit('deleteUser', dataObj);
            });
        }
    });

    socket.on('addNewPackage' , function (response) {
        if(userType != 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log( 'Adding new package...',response);
            var packageObj = {
                id : '',
                Value: response.newPackageValue,
                Size: response.newPackageSize,
                Weight: response.newPackageWeight,
                State: 'waiting for courier',
                Delivery_Address: response.newPackageDeliveryAddress,
                Delivery_Person: response.newPackageDeliveryPerson,
            };
            repo.CRUD.create('package', packageObj, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    package: packageObj
                };
                socket.emit('addNewPackage', dataObj);
            });
        }
    });

    socket.on('editPackage', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            var setQuery = 'Weight =' + '\'' + response.Weight + '\','+
                'Value =' + '\'' + response.Value+ '\',' +
                'Size =' + '\'' + response.Size+ '\',' +
                'State =' + '\'' + response.State+ '\',' +
                'Delivery_Address =' + '\'' + response.Delivery_Address+ '\',' +
                'Delivery_Person =' + '\'' + response.Delivery_Person+ '\'';

            var whereQuery = 'id =' + '\'' + response.id + '\'';
            repo.CRUD.updateWhere('package', setQuery, whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    package: response
                };
                socket.emit('editPackage', dataObj);
            });
        }
    });

    socket.on('deletePackage', function (response) {
        if(userType !== 'admin'){
            socket.emit('adminGetData', 'You are not logged in as administrator!');
        } else {
            console.log('Deleting package...', response);
            var whereQuery = 'id =' + '\'' + response + '\'';

            repo.CRUD.deleteWhere('package', whereQuery, function (dbResponse) {
                var dataObj = {
                    response: dbResponse,
                    Old_Reg: response
                };
                socket.emit('deletePackage', dataObj);
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
