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
    .when("/countryInfo", {
        template: "<countryInfo></countryInfo>"
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);

