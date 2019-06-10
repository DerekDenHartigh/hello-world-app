"use strict";

function HomeController(earthwormJimService) {

    }

angular
.module('HelloWorldApp')  
.component('home', {
    templateUrl: '/app/components/home/homeTemplate.html',
    controller: HomeController
});