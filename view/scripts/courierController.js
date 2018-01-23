app.controller('courierController', function($scope, courierService) {
    $scope.courierData = {};
    $scope.packageForEdit = {};
    courierService.subscribeOnCourierGetData(function (result) {
        $scope.courierData = result;
        console.log($scope.courierData);
        translateStatuses();
        console.log($scope.courierData);
        $scope.$apply();
    });
    courierService.subscribeOnCourierEditState(function (result) {
        console.log(result);
        if(result.dbResponse){
            for(var i = 0;i<$scope.courierData.packageData.length;i++){
                if($scope.courierData.packageData[i].id === result.package.id){
                    $scope.courierData.packageData[i].State = result.package.State;
                    break;
                }
            }
        }
        translateStatuses();
        $scope.$apply();
        console.log($scope.courierData.packageData);
    });
    $scope.prepareModalEditStatus = function (packageToEdit) {
        $scope.packageForEdit = packageToEdit;
    };
    $scope.editStatus = function () {
        var statusIndex = document.getElementById('editStatusSelector').selectedIndex;
        var newStatus = '';
        switch (statusIndex){
            case 0:
                newStatus = 'taken_from_client';
                break;
            case 1:
                newStatus = 'in magazine';
                break;
            case 2:
                newStatus = 'in_delivery';
                break;
            case 3:
                newStatus = 'delivered';
                break;
        }
        $scope.packageForEdit.State = newStatus;
        courierService.editState({id: $scope.courierData.userData.id, package: $scope.packageForEdit});

    };

    var translateStatuses = function () {
        for(var i = 0;i<$scope.courierData.packageData.length;i++){
            switch ($scope.courierData.packageData[i].State){
                case 'waiting for courier':
                    $scope.courierData.packageData[i].StateTranslated = 'Oczekuje na odbiór od klienta';
                    break;
                case 'taken_from_client':
                    $scope.courierData.packageData[i].StateTranslated = 'Odebrane od klienta, w drodze do magazynu';
                    break;
                case 'in magazine':
                    $scope.courierData.packageData[i].StateTranslated = 'W magazynie';
                    break;
                case 'in_delivery':
                    $scope.courierData.packageData[i].StateTranslated = 'W drodze do odbiorcy';
                    break;
                case 'delivered':
                    $scope.courierData.packageData[i].StateTranslated = 'Dostarczone';
                    break;
            }
        }
    };

});