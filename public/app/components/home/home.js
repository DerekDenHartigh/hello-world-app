"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    const service = helloWorldService;

    ctrl.service.getCountry()

    }

angular
.module('HelloWorldApp')  
.component('home', {
    templateUrl: '/app/components/home/homeTemplate.html',
    controller: HomeController
});