var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/login.html"
        })
        .when("/user", {
            templateUrl : "templates/user.html"
        })
        .when("/green", {
            templateUrl : "green.html"
        })
        .when("/blue", {
            templateUrl : "blue.html"
        });
});