app.service('courierService', function() {
    var subscribeOnCourierGetData = function (callback) {
        socket.on('courierGetData', function (result) {
            callback(result);
        });
    };
    var subscribeOnCourierEditState = function (callback) {
        socket.on('editState', function (result) {
            console.log(result);
            callback(result);
        });
    };

    var editState = function (data) {
        console.log(data);
        socket.emit('editState', data);
    };

    return {
        subscribeOnCourierGetData: subscribeOnCourierGetData,
        subscribeOnCourierEditState: subscribeOnCourierEditState,
        editState: editState
    };
});