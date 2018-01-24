app.service('managerService', function() {
    var subscribeOnManagerGetData = function (callback) {
        socket.on('managerGetData', function (result) {
            callback(result);
        });
    };
    var subscribeOnManagerSelectCourier = function (callback) {
        socket.on('managerSelectCourier', function (result) {
            callback(result);
        });
    };
    var subscribeOnEditCarStatus = function (callback) {
        socket.on('managerEditCarStatus', function (result) {
            callback(result);
        });
    };
    var editCarStatus = function (data) {
        console.log(data);
        socket.emit('managerEditCarStatus', data);
    };
    var selectCourier = function (data) {
        console.log(data);
        socket.emit('managerSelectCourier', data);
    };
    return {
        subscribeOnManagerGetData: subscribeOnManagerGetData,
        subscribeOnManagerSelectCourier: subscribeOnManagerSelectCourier,
        subscribeOnEditCarStatus: subscribeOnEditCarStatus,
        editCarStatus: editCarStatus,
        selectCourier: selectCourier
    };
});