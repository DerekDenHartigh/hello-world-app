"use strict";

function HomeController() {

}

angular
.module('HelloWorldApp')  
.component('home', {
    templateUrl: '/app/components/home/homeTemplate.html',
    controller: HomeController
});