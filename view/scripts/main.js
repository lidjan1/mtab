var app = angular.module("myApp", ["ngRoute"]);
var socket = io('http://localhost:81');
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/login.html"
        })
        .when("/admin", {
            templateUrl : "templates/admin.html"
        })
        .when("/courier", {
            templateUrl : "templates/courier.html"
        })
        .when("/manager", {
            templateUrl : "templates/manager.html"
        })
        .when("/client", {
            templateUrl : "templates/client.html"
        });
});