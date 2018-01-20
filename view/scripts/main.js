var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/login.html"
        })
        .when("/red", {
            templateUrl : "red.html"
        })
        .when("/green", {
            templateUrl : "green.html"
        })
        .when("/blue", {
            templateUrl : "blue.html"
        });
});