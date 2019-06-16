"use strict";

function CountryInfoController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.countryData = ctrl.service.countryData;
    ctrl.getCountryData = (countryInput)=> {
        ctrl.service.getCountry(countryInput)
        .then((data)=> {
            ctrl.service.show = true;
            return;
        })
        .catch((err) => {
            alert("Are you spelled that correctly?  Please try again!");
            console.error(err);
        })
    }

}


angular
.module('HelloWorldApp')  
.component('countryInfo', {
    template: `
    <div class="search">Where would you like to go?
        <input type="text" ng-model="$ctrl.countryInput" class="searchbar">
        <button class="searchButton" ng-click="$ctrl.getCountryData($ctrl.countryInput)"> Explore </button>
    </div> 
        `,
    controller: CountryInfoController
});