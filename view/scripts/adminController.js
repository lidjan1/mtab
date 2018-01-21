app.controller('adminController', function($scope) {
    $scope.adminData = {};
    $scope.usersLayout = true;
    $scope.carsLayout = false;
    $scope.ordersLayout = false;
    $scope.packagesLayout = false;
    $scope.setLayout = function (layout) {
        switch (layout){
            case 'users':
                $scope.usersLayout = true;
                $scope.carsLayout = false;
                $scope.ordersLayout = false;
                $scope.packagesLayout = false;
                break;
            case 'cars':
                $scope.usersLayout = false;
                $scope.carsLayout = true;
                $scope.ordersLayout = false;
                $scope.packagesLayout = false;
                break;
            case 'orders':
                $scope.usersLayout = false;
                $scope.carsLayout = false;
                $scope.ordersLayout = true;
                $scope.packagesLayout = false;
                break;
            case 'packages':
                $scope.usersLayout = false;
                $scope.carsLayout = false;
                $scope.ordersLayout = false;
                $scope.packagesLayout = true;
                break;
        }
    };
    socket.on('adminGetData', function (result) {
        console.log(result);
        $scope.adminData = result;
    });
});