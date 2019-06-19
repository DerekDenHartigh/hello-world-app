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
            <countryInfo></countryInfo>
            <translate></translate>
            <div id="mainColumns" class="flex">
            <translate class="flex"></translate>
            <display-data calss="flex"></display-data>
        </div>
        `
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);

