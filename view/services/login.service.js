app.service('loginService', function() {
    var login = function (user, password) {
        console.log(user, password);
        socket.emit('login', {user: user, password: password});
    };

    return {
        login: login
    };
});