app.service('adminService', function() {
    var addNewCar = function (data) {
        console.log(data);
        socket.emit('addNewCar', data);
    };
    var editCar = function (data) {
        console.log(data);
        socket.emit('editCar', data);
    };
    var deleteCar = function (data) {
        console.log(data);
        socket.emit('deleteCar', data);
    };
    var addNewPackage = function (data) {
        console.log(data);
        socket.emit('addNewPackage', data);
    }

    var subscribeOnAddNewPackage = function (callback) {
        socket.on('addNewPackage', function (result) {
           callback(result);
        });
    };

    var subscribeOnAdminGetData = function (callback) {
        socket.on('adminGetData', function (result) {
            callback(result);
        });
    };

    var subscribeOnAddNewCar = function (callback) {
        socket.on('addNewCar', function (result) {
            callback(result);
        });
    };

    var subscribeOnEditCar = function (callback) {
        socket.on('editCar', function (result) {
            callback(result);
        });
    };

    var subscribeOnDeleteCar = function (callback) {
        socket.on('deleteCar', function (result) {
            callback(result);
        });
    };

    return {
        addNewPackage: addNewPackage,
        addNewCar: addNewCar,
        editCar: editCar,
        deleteCar: deleteCar,
        subscribeOnAddNewPackage: subscribeOnAddNewPackage,
        subscribeOnAdminGetData: subscribeOnAdminGetData,
        subscribeOnAddNewCar: subscribeOnAddNewCar,
        subscribeOnEditCar: subscribeOnEditCar,
        subscribeOnDeleteCar: subscribeOnDeleteCar
    };
});