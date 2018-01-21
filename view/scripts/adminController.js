app.controller('adminController', function($scope, adminService) {
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
        $scope.adminData = result;
        $scope.$apply();
    });
    socket.on('addNewCar', function (result) {
        if(result.response){
            $scope.adminData.carsData.push(result.car);
            $scope.$apply();
        }
    });
    $scope.newCar = {
        newCarReg: '',
        newCarYear: '',
        newCarCondition: 'good',
        newCarType: ''
    };
    $scope.addNewCar = function () {
        adminService.addNewCar($scope.newCar);
        document.getElementById('addNewCarReg').value = '';
        document.getElementById('addNewCarYear').value = '';
        document.getElementById('addNewCarCondition').value = 'Dobry';
        document.getElementById('addNewCarType').value = '';
    };
});