"use strict";

angular.module("HelloWorldApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/about", {
        template: "<about></about>"
    })
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

