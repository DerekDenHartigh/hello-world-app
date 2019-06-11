"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    const service = helloWorldService;

    ctrl.service.getCountry()

    }

angular
.module('HelloWorldApp')  
.component('home', {
    // templateUrl: '/app/components/home/homeTemplate.html',
    // templateUrl: './homeTemplate.html',
    // templateUrl: "/homeTemplate.html",
    template: `
    <h1>I am the Home Template!</h1>
    `,
    controller: HomeController
});