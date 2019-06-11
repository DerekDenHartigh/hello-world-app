"use strict";

function CountryInfoController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    
    }

angular
.module('HelloWorldApp')  
.component('countryInfo', {
    templateUrl: '/app/components/countryInfo/countryInfoTemplate.html',
    controller: CountryInfoController
});