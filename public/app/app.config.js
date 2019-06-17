"use strict";

angular.module("HelloWorldApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/home", {
        template: `
        <home class="flex"></home>
        `
    })
    .when("/Explore", {
        template: `
            <explore></explore>
        `
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);

