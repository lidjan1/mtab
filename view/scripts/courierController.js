app.controller('courierController', function($scope, courierService) {
    $scope.courierData = {};

    courierService.subscribeOnCourierGetData(function (result) {
        $scope.courierData = result;
        console.log($scope.courierData);
        $scope.$apply();
    });
});