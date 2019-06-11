"use strict";

angular.module("HelloWorldApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/home", {
        template: "<home></home>"
    })
    .when("/translate", {
        template: "<translate></translate>"
    })
    .when("/country-info", {
        template: "<country-info></country-info>"
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);

