app.service('adminService', function() {
    var editOrder = function (data) {
        console.log(data);
        socket.emit('editOrder', data);
    };
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

    var addNewUser = function (data) {
        console.log(data);
        socket.emit('addNewUser',data);
    }

    var editUser = function (data) {
        console.log(data);
        socket.emit('editUser', data);
    }

    var deleteUser = function (data) {
        console.log(data);
        socket.emit('deleteUser',data);
    }
    var addNewPackage = function (data) {
        console.log(data);
        socket.emit('addNewPackage', data);
    };
    var deletePackage = function (data) {
        console.log(data);
        socket.emit('deletePackage', data);
    };
    
    var editPackage = function (data) {
        console.log(data);
        socket.emit('editPackage', data);
    };

    var subscribeOnEditUser = function (callback) {
        socket.on('editPackage', function (result) {
            callback(result);
        })
    }

    var subscribeOnAddNewUser = function (callback) {
        socket.on('addNewUser', function (result) {
            callback(result);
        });
    };

    var subscribeOnDeleteUser= function (callback) {
        socket.on('deleteUser', function (result) {
            callback(result);
        });
    };
    var subscribeOnEditPackage = function (callback) {
        socket.on('editPackage', function (result) {
            callback(result);
        });
    };

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

    var subscribeOnDeletePackage = function (callback) {
        socket.on('deletePackage', function (result) {
            callback(result);
        })
    };

    var subscribeOnEditOrder = function (callback) {
        socket.on('editOrder', function (result) {
            callback(result);
        });
    };

    return {
        addNewUser : addNewUser,
        editUser : editUser,
        deleteUser : deleteUser,
        deletePackage: deletePackage,
        editPackage: editPackage,
        addNewPackage: addNewPackage,
        addNewCar: addNewCar,
        editCar: editCar,
        deleteCar: deleteCar,
        subscribeOnAddNewUser : subscribeOnAddNewUser,
        subscribeOnEditUser : subscribeOnEditUser,
        subscribeOnDeleteUser : subscribeOnDeleteUser,
        editOrder: editOrder,
        subscribeOnDeletePackage : subscribeOnDeletePackage,
        subscribeOnEditPackage: subscribeOnEditPackage,
        subscribeOnAddNewPackage: subscribeOnAddNewPackage,
        subscribeOnAdminGetData: subscribeOnAdminGetData,
        subscribeOnAddNewCar: subscribeOnAddNewCar,
        subscribeOnEditCar: subscribeOnEditCar,
        subscribeOnDeleteCar: subscribeOnDeleteCar,
        subscribeOnEditOrder: subscribeOnEditOrder
    };
});