app.controller('clientController', function($scope, clientService) {
    $scope.clientData = {};
    $scope.layoutMyOrders = true;
    $scope.layoutAddOrder = false;
    $scope.package = {
        Weight: 0,
        Size: 0,
        Value: 15
    };
    $scope.recalculatePackageValue = function () {
        var weight = $scope.package.Weight;
        var size = $scope.package.Size;
        var value = 15;
        if(weight > 2){
            value = value + 5*(weight-2);
        }
        if(size > 27000){
            value = value + 5*((Math.pow(size, 1/3)-30)/10);
        }
        var grosze = (value % 1)*100;
        grosze = Math.round(grosze);
        $scope.package.Value = Math.floor(value) + (grosze/100);
    };
    $scope.setClientLayout = function (layout) {
        switch (layout){
            case 'myOrders':
                $scope.layoutMyOrders = true;
                $scope.layoutAddOrder = false;
                break;
            case 'addOrder':
                $scope.layoutMyOrders = false;
                $scope.layoutAddOrder = true;
                break;
        }
    };
    $scope.addNewOrder = function () {
        clientService.addNewOrder({package: $scope.package, id: $scope.clientData.userData.id});
        document.getElementById('clientAddOrderWeight').value = 0;
        document.getElementById('clientAddOrderSize').value = 0;
        document.getElementById('clientAddOrderPerson').value = '';
        document.getElementById('clientAddOrderAddress').value = '';
        $scope.recalculatePackageValue();
    };

    clientService.subscribeOnClientGetData(function (result) {
        $scope.clientData = result;
        console.log($scope.clientData);
        $scope.$apply();
    });
    clientService.subscribeOnClientNewOrder(function (result) {
        console.log('Result from newOrder', result);
        if(result.response){
            $scope.clientData.packageData.push(result.package);
            $scope.setClientLayout('myOrders');
            $scope.$apply();
        }
    })
});