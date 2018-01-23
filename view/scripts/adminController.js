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
    $scope.newCar = {
        newCarReg: '',
        newCarYear: '',
        newCarCondition: 'good',
        newCarType: ''
    };
    $scope.newPackage = {
        newPackageWeight: '',
        newPackageValue: '',
        newPackageSize: '',
        newPackageState: '',
        newPackageDeliveryAddress: '',
        newPackageWeightDeliveryPerson: '',
    }

    $scope.oldRegForCarEdit = '';
    $scope.addNewCar = function () {
        adminService.addNewCar($scope.newCar);
        document.getElementById('addNewCarReg').value = '';
        document.getElementById('addNewCarYear').value = '';
        document.getElementById('addNewCarCondition').value = 'Dobry';
        document.getElementById('addNewCarType').value = '';
    };
    $scope.prepareModalEditCar = function (car) {
        console.log(car);
        $scope.oldRegForCarEdit = car.Registration_number;
        document.getElementById('editCarReg').value = car.Registration_number;
        document.getElementById('editCarYear').value = car.Year_of_production;
        document.getElementById('editCarCondition').value = car.Technical_condition;
        document.getElementById('editCarType').value = car.Type;
    };
    $scope.editCar = function () {
        var reg = document.getElementById('editCarReg').value;
        var year = document.getElementById('editCarYear').value;
        var con = document.getElementById('editCarCondition').value;
        var type = document.getElementById('editCarType').value;
        var car = {
            Registration_number: reg,
            Year_of_production: year,
            Technical_condition: con,
            Type: type,
            Old_Reg: $scope.oldRegForCarEdit
        };
        adminService.editCar(car);
    };

    $scope.addNewPackage = function () {
        adminService.addNewPackage($scope.newPackage);
        document.getElementById('addNewPackageWeight').value = '';
        document.getElementById('addNewPackageValue').value = '';
        document.getElementById('addNewPackageSize').value = '';
        document.getElementById('addNewPackageDeliveryAddress').value = '';
        document.getElementById('addNewPackageDeliveryPerson').value = '';
    }

    $scope.deleteCar = function () {
        var reg = document.getElementById('editCarReg').value;
        adminService.deleteCar(reg);
    };

    adminService.subscribeOnAddNewPackage( function (result) {
        if (result.response) {
            $scope.adminData.packageData.push(result.package);
            $scope.$apply();
        }
    });

    adminService.subscribeOnAdminGetData(function (result) {
        $scope.adminData = result;
        $scope.$apply();
    });
    adminService.subscribeOnAddNewCar(function (result) {
        if(result.response){
            $scope.adminData.carsData.push(result.car);
            $scope.$apply();
        }
    });
    adminService.subscribeOnEditCar(function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.carsData.length;i++){
                if($scope.adminData.carsData[i].Registration_number === result.car.Old_Reg){
                    delete result.car.Old_Reg;
                    $scope.adminData.carsData[i] = result.car;
                    break;
                }
            }
            $scope.$apply();
        }
    });
    adminService.subscribeOnDeleteCar(function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.carsData.length;i++){
                if($scope.adminData.carsData[i].Registration_number === result.Old_Reg){
                    $scope.adminData.carsData.splice(i, 1);
                    break;
                }
            }
            console.log($scope.adminData.carsData);
            $scope.$apply();
        }
    });
});