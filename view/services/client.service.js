app.service('clientService', function() {
    var addNewOrder = function (data) {
        console.log(data);
        socket.emit('clientNewOrder', data);
    };


    var subscribeOnClientGetData = function (callback) {
        socket.on('clientGetData', function (result) {
            callback(result);
        });
    };

    var subscribeOnClientNewOrder = function (callback) {
        socket.on('clientNewOrder', function (result) {
            callback(result);
        });
    };

    return {
        subscribeOnClientGetData: subscribeOnClientGetData,
        subscribeOnClientNewOrder: subscribeOnClientNewOrder,
        addNewOrder: addNewOrder
    };
});