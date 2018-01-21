app.service('loginService', function() {
    var login = function (user, password) {
        console.log(user, password);
        socket.emit('login', {user: user, password: password});
    };
    var loginSubscribe = function (callback) {
        socket.on('login', function (result) {
            callback(result);
        });
    };
    return {
        login: login,
        loginSubscribe: loginSubscribe
    };
});