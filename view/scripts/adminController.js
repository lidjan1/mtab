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
        newPackageDeliveryPerson: '',
    }
    $scope.newUser = {
        newUserName: '',
        newUserSurname: '',
        newUserAddress: '',
        newUserLogin: '',
        newUserPassword: '',
        newUserType: ''
    }

    $scope.oldRegForCarEdit = '';
    $scope.actualState = '';
    $scope.packageId = '';
    $scope.idOfDeletingPackage;
    $scope.userId = '';
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
        $scope.packageId = package.id;
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

    $scope.deleteCar = function () {
        var reg = document.getElementById('editCarReg').value;
        adminService.deleteCar(reg);
    };

    $scope.editUser = function () {
        var name = document.getElementById('editUserName').value;
        var surname = document.getElementById('editUserSurname').value;
        var address = document.getElementById('editUserAddress').value;
        var received = document.getElementById('editUserPackagesReceived').value;
        var log = document.getElementById('editUserLogin').value;
        var pass = document.getElementById('editUserPassword').value;
        var user = {
            id : $scope.userId,
            Name : name,
            Surname : surname,
            Adress : address,
            Packages_received : received,
            login : log,
            password : pass
        }
        adminService.editUser(user);
    }

    $scope.addNewUser= function () {
        adminService.addNewUser($scope.newUser);
        document.getElementById('addNewUserName').value = '';
        document.getElementById('addNewUserSurname').value = '';
        document.getElementById('addNewUserAddress').value = '';
        document.getElementById('addNewUserType').value = 'client';
        document.getElementById('addNewUserLogin').value = '';
        document.getElementById('addNewUserPassword').value = '';
    };

    $scope.prepareModalEditUser = function (user) {
        $scope.userId = user.id;
        document.getElementById('editUserName').value = user.Name;
        document.getElementById('editUserSurname').value = user.Surname;
        document.getElementById('editUserAddress').value = user.Adress;
        document.getElementById('editUserPackagesReceived').value = user.Packages_received;
        document.getElementById('editUserLogin').value = user.login;
        document.getElementById('editUserPassword').value = user.password;
    };

    $scope.deleteUser = function () {
        var id = $scope.userId;
        adminService.deleteUser(id);
    }

    $scope.deletePackage = function () {
        var id = $scope.packageId;
        adminService.deletePackage(id);
    }

    $scope.editPackage = function () {
        var value = document.getElementById('editPackageValue').value;
        var weight = document.getElementById('editPackageWeight').value;
        var size = document.getElementById('editPackageSize').value;
        var state = document.getElementById('editPackageState').value;
        var deliveryAddress = document.getElementById('editPackageDeliveryAddress').value;
        var deliveryPerson = document.getElementById('editPackageDeliveryPerson').value;
        var package = {
            id : $scope.packageId,
            Value : value,
            Weight : weight,
            Size : size,
            State : state,
            Delivery_Address : deliveryAddress,
            Delivery_Person : deliveryPerson,
            Actual_State: $scope.actualState
        }
        adminService.editPackage(package);
    };

    $scope.prepareModalEditPackage = function (package) {
        console.log(package);
        $scope.actualState = package.State;
        $scope.packageId = package.id;
        document.getElementById('editPackageValue').value = package.Value;
        document.getElementById('editPackageSize').value = package.Size;
        document.getElementById('editPackageWeight').value = package.Weight;
        document.getElementById('editPackageState').value = package.State;
        document.getElementById('editPackageDeliveryPerson').value = package.Delivery_Person;
        document.getElementById('editPackageDeliveryAddress').value = package.Delivery_Address;
    };

    $scope.addNewPackage = function () {
        adminService.addNewPackage($scope.newPackage);
        document.getElementById('addNewPackageWeight').value = '';
        document.getElementById('addNewPackageValue').value = '';
        document.getElementById('addNewPackageSize').value = '';
        document.getElementById('addNewPackageDeliveryAddress').value = '';
        document.getElementById('addNewPackageDeliveryPerson').value = '';
    };

    adminService.subscribeOnAddNewUser( function (result) {
        if (result.response) {
            $scope.adminData.userData.push(result.user);
            $scope.$apply();
        }
    })

    adminService.subscribeOnEditUser( function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.userData.length;i++){
                if($scope.adminData.packageData[i].id == result.userId){
                    $scope.adminData.packageData[i] = result.user;
                    break;
                }
            }
            $scope.apply();
        }
    });

    adminService.subscribeOnDeleteUser( function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.userData.length;i++){
                if($scope.adminData.userData[i].id === result.userId){
                    $scope.adminData.userData.splice(i, 1);
                    break;
                }
            }
            console.log($scope.adminData.userData);
            $scope.$apply();
        }
    });


    adminService.subscribeOnEditPackage( function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.packageData.length;i++){
                if($scope.adminData.packageData[i].id == result.id){
                    $scope.adminData.packageData[i] = result.package;
                    break;
                }
            }
            $scope.apply();
        }
    });

    adminService.subscribeOnDeletePackage( function (result) {
        if(result.response){
            for(var i = 0;i<$scope.adminData.packageData.length;i++){
                if($scope.adminData.packageData[i].id === result.packageId){
                    $scope.adminData.packageData.splice(i, 1);
                    break;
                }
            }
            console.log($scope.adminData.packageData);
            $scope.$apply();
        }
    });

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