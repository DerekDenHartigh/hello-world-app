"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.countryData = ctrl.service.countryData;
    // ctrl.setCountry = ()=>{
    //     ctrl.service.getCountry("china");
    // }
    // ctrl.service.getCountry()
    // ctrl.service.getCountry(country); // just for testing
    // ctrl.setCountry("china");
    ctrl.service.getTranslation();
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