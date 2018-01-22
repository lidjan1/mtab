var repo = require('./repo');

exports.clientHandlers = function (socket, userType, userID) {
    socket.on('clientGetData', function (response) {
        if(userType !== 'client' || userID !== response.id){
            socket.emit('clientGetData', 'You are not logged in as client!');
        } else {
            var dataObj = {};
            var dataCounter = 0;
            repo.CRUD.readWhere('clients', 'id='  + '\'' + userID + '\'' ,function (response) {
                dataObj.userData = response[0];
                dataCounter++;
            });
            repo.CRUD.readWhere('orders', 'Client_id='  + '\'' + userID + '\'', function (response) {
                var packageIdArray = [];
                for(var i = 0;i<response.length;i++){
                    packageIdArray.push(response[i].Package_id);
                }
                repo.CRUD.read('package', function (response) {
                    var packagesArray = [];
                    for(var i = 0;i<packageIdArray.length;i++){
                        for(var j = 0;j<response.length;j++){
                            if(packageIdArray[i] === response[j].id){
                                packagesArray.push(response[j]);
                            }
                        }
                    }
                    dataObj.packageData = packagesArray;
                    dataCounter++;
                });
            });

            var counterInterval = setInterval(function(){
                if(dataCounter === 2){
                    socket.emit('clientGetData', dataObj);
                    clearInterval(counterInterval);
                }
            }, 250);
        }
    });
    socket.on('clientNewOrder', function (response) {
        if(userType !== 'client' || userID !== response.id){
            socket.emit('clientGetData', 'You are not logged in as client!');
        } else {
            console.log('Adding new package...', response);
            var packageData = {
                Weight: response.package.Weight,
                Value: response.package.Value,
                Size: response.package.Size
            };
            repo.CRUD.create('package', packageData, function (dbResponse) {
                if(dbResponse){
                    packageData.State = 'waiting for courier';
                    var packageObj = {
                        response: dbResponse,
                        package: packageData
                    };
                    repo.CRUD.read('package', function (result) {
                        var lastId = result[(result.length-1)].id;
                        var dataObj = {
                            Package_id: lastId,
                            Client_id: userID
                        };
                        repo.CRUD.create('orders', dataObj, function (dbResponse) {
                            if(dbResponse){
                                socket.emit('clientNewOrder', packageObj);
                            }
                        })
                    });
                }
            });
        }
    })
};
