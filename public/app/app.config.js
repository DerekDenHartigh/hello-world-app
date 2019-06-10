"use strict";

angular.module("HelloWorldApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/home", {
        template: "<home></home>"
    })
    .when("/", {
        template: "<></>"
    })
    .when("/", {
        template: "<></>"
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);

