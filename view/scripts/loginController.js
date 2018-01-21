app.controller('loginController', function($scope, $location, $window, loginService) {
    $scope.user = '';
    $scope.password = '';
    $scope.login  = function () {
        loginService.login($scope.user, $scope.password);
        $scope.user = '';
        $scope.password = '';
        document.getElementById('login').value = '';
        document.getElementById('pwd').value = '';
    };

    loginService.loginSubscribe(function (result) {
        if(result){
            console.log(result);
            switch(result.user_type){
                case 'admin':
                    socket.emit('adminGetData');
                    var currentUrl = $location.absUrl();
                    location.href = (currentUrl + 'admin');
                    break;
                case 'client':
                    //socket.emit('adminGetData');
                    break;
                case 'courier':
                    //socket.emit('adminGetData');
                    break;
                case 'manager':
                    //socket.emit('adminGetData');
                    break;
            }
        } else {
            alert('błędne logowanie, sprawdź login i hasło!');
        }
    });
});