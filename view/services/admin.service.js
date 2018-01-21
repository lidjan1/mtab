app.service('adminService', function() {
    var addNewCar = function (data) {
        console.log(data);
        socket.emit('addNewCar', data);
    };
    var editCar = function (data) {
        console.log(data);
        socket.emit('editCar', data);
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

    return {
        addNewCar: addNewCar,
        editCar: editCar,
        subscribeOnAdminGetData: subscribeOnAdminGetData,
        subscribeOnAddNewCar: subscribeOnAddNewCar,
        subscribeOnEditCar: subscribeOnEditCar
    };
});