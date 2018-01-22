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
            var currentUrl;
            switch(result.user_type){
                case 'admin':
                    socket.emit('adminGetData');
                    currentUrl = $location.absUrl();
                    location.href = (currentUrl + 'admin');
                    break;
                case 'client':
                    socket.emit('clientGetData', {id: result.id});
                    currentUrl = $location.absUrl();
                    location.href = (currentUrl + 'client');
                    break;
                case 'courier':
                    socket.emit('courierGetData', {id: result.id});
                    currentUrl = $location.absUrl();
                    location.href = (currentUrl + 'courier');
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