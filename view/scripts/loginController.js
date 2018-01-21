app.controller('loginController', function($scope, loginService) {
    $scope.user = '';
    $scope.password = '';
    $scope.login  = function () {
        loginService.login($scope.user, $scope.password);
        $scope.user = '';
        $scope.password = '';
        document.getElementById('login').value = '';
        document.getElementById('pwd').value = '';
    };
    socket.on('login', function (result) {
        if(result){
            console.log(result);
            switch(result.user_type){
                case 'admin':
                    console.log('Zalogowano jako admin!');
                    socket.emit('adminGetData');
                    break;
                case 'client':
                    console.log('Zalogowano jako client!');
                    socket.emit('adminGetData');
                    break;
                case 'courier':
                    break;
                case 'manager':
                    break;
            }
        } else {
            alert('błędne logowanie, sprawdź login i hasło');
        }
    });
});