app.controller('managerController', function($scope, managerService) {
    $scope.managerData = {};
    $scope.notStarted = [];
    $scope.notStartedPackages = [];
    $scope.notStartedClients = [];
    $scope.startedPackages = [];
    $scope.startedPackagesCouriers = [];
    $scope.startedPackagesPersons = [];
    $scope.layoutMyOrders = true;
    $scope.layoutMyCars = false;
    $scope.packageIdForCourierSet = null;
    $scope.carIdForStateEdit = null;
    managerService.subscribeOnManagerSelectCourier(function (result) {
        if(result){
            socket.emit('managerGetData', {id: $scope.managerData.userData.id});
        }
    });
    managerService.subscribeOnManagerGetData(function (result) {
        $scope.notStarted = [];
        $scope.notStartedPackages = [];
        $scope.notStartedClients = [];
        $scope.startedPackages = [];
        $scope.startedPackagesCouriers = [];
        $scope.startedPackagesPersons = [];
        $scope.managerData = result;
        console.log($scope.managerData);
        $scope.prepareData();
        console.log($scope.startedPackages);
        $scope.$apply();
    });
    managerService.subscribeOnEditCarStatus(function (result) {
       if(result.response){
           for(var i = 0;i<$scope.managerData.carsData.length;i++){
               if($scope.managerData.carsData[i].Registration_number === result.car.Registration_number){
                   $scope.managerData.carsData[i] = result.car;
                   break;
               }
           }
           $scope.$apply();
       }
    });
    $scope.setManagerLayout = function (type) {
        if(type === 'cars'){
            $scope.layoutMyOrders = false;
            $scope.layoutMyCars = true;
        } else if (type === 'orders') {
            $scope.layoutMyOrders = true;
            $scope.layoutMyCars = false;
        }
    };
    $scope.prepareModalEditCourier = function (idOfPackage) {
        $scope.packageIdForCourierSet = idOfPackage;
    };
    $scope.selectCourier = function () {
        var index = document.getElementById('editCourierSelector').selectedIndex;
        var selectedCourier = $scope.managerData.couriersData[index];
        console.log(selectedCourier, $scope.packageIdForCourierSet);
        managerService.selectCourier({id: $scope.managerData.userData.id, Courier_id: selectedCourier.id, Package_id: $scope.packageIdForCourierSet});
    };
    $scope.prepareModalCarState = function (car) {
        $scope.carIdForStateEdit = car;
    };
    $scope.editCarStatus = function () {
        var newStatus = document.getElementById('editCarStatusSelector').value;
        var car = $scope.carIdForStateEdit;
        car.Technical_condition = newStatus;
        managerService.editCarStatus({id: $scope.managerData.userData.id, car: car});
    };
    $scope.prepareData = function () {
        var arrayOfPackagesIds = [];
        var startedPackagesIds = [];
        for(var i = 0;i<$scope.managerData.ordersData.length;i++){
            if($scope.managerData.ordersData[i].Courier_id === null){
                arrayOfPackagesIds.push($scope.managerData.ordersData[i]);
            } else {
                startedPackagesIds.push($scope.managerData.ordersData[i]);
            }
        }
        for(var j = 0;j<arrayOfPackagesIds.length;j++){
            for(i = 0;i<$scope.managerData.packageData.length;i++){
                if($scope.managerData.packageData[i].id === arrayOfPackagesIds[j].Package_id){
                    $scope.notStartedPackages.push($scope.managerData.packageData[i]);
                }
            }
            for(var x = 0;x<$scope.managerData.clientsData.length;x++){
                if($scope.managerData.clientsData[x].id === arrayOfPackagesIds[j].Client_id){
                    $scope.notStartedClients.push($scope.managerData.clientsData[x]);
                }
            }
            $scope.notStartedPackages[j].Person = $scope.notStartedClients[j];
        }
        for(i = 0;i<startedPackagesIds.length;i++){
            for(j = 0;j<$scope.managerData.packageData.length;j++){
                if($scope.managerData.packageData[j].id === startedPackagesIds[i].Package_id){
                    $scope.startedPackages.push($scope.managerData.packageData[j]);
                }
            }
            for(var z = 0;z<$scope.managerData.couriersData.length;z++){
                if($scope.managerData.couriersData[z].id === startedPackagesIds[i].Courier_id){
                    $scope.startedPackagesCouriers.push($scope.managerData.couriersData[z].Name + ' ' + $scope.managerData.couriersData[z].Surname);
                }
            }
            for(x = 0;x<$scope.managerData.clientsData.length;x++){
                if($scope.managerData.clientsData[x].id === startedPackagesIds[i].Client_id){
                    $scope.startedPackagesPersons.push($scope.managerData.clientsData[x].Name + ' ' + $scope.managerData.clientsData[x].Surname + ' ' + $scope.managerData.clientsData[x].Adress);
                }
            }
            $scope.startedPackages[i].Courier = $scope.startedPackagesCouriers[i];
            $scope.startedPackages[i].Person = $scope.startedPackagesPersons[i];
        }
    };
});