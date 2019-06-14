"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;

    // ctrl.service.getCountry(); // just for testing
    ctrl.service.getTranslation();
}

angular
.module('HelloWorldApp')  
.component('home', {
    template: `
    <h1>I am the Home Template!</h1>
    `,
    controller: HomeController
});