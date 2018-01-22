var repo = require('./repo');

exports.courierHandlers = function (socket, userType, userID) {
    socket.on('courierGetData', function (response) {
        if(userType !== 'courier' || userID !== response.id){
            socket.emit('courierGetData', 'You are not logged in as courier!');
        } else {
            var dataObj = {};
            var dataCounter = 0;
            repo.CRUD.readWhere('couriers', 'id='  + '\'' + userID + '\'' ,function (response) {
                dataObj.userData = response[0];
                dataCounter++;
            });
            repo.CRUD.readWhere('orders', 'Courier_id='  + '\'' + userID + '\'', function (response) {
                var packageIdArray = [];
                var clientsIdArray = [];
                for(var i = 0;i<response.length;i++){
                    packageIdArray.push(response[i].Package_id);
                    clientsIdArray.push(response[i].Client_id);
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
                    repo.CRUD.read('clients', function (response) {
                        for(var i = 0;i<clientsIdArray.length;i++){
                            for(var j = 0;j<response.length;j++){
                                if(clientsIdArray[i] === response[j].id){
                                    dataObj.packageData[i].Adress = response[j].Adress;
                                }
                            }
                        }
                        dataCounter++;
                    });
                });
            });

            var counterInterval = setInterval(function(){
                if(dataCounter === 2){
                    socket.emit('courierGetData', dataObj);
                    clearInterval(counterInterval);
                }
            }, 250);
        }
    });
};
