app.service('adminService', function() {
    var addNewCar = function (data) {
        console.log(data);
        socket.emit('addNewCar', data);
    };

    return {
        addNewCar: addNewCar
    };
});