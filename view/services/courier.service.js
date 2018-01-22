app.service('courierService', function() {
    var subscribeOnCourierGetData = function (callback) {
        socket.on('courierGetData', function (result) {
            callback(result);
        });
    };

    return {
        subscribeOnCourierGetData: subscribeOnCourierGetData,
    };
});