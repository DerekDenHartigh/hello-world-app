"use strict";

function CountryInfoController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.countryData = ctrl.service.countryData;
    ctrl.getCountryData = (countryInput)=> {
        ctrl.service.getCountry(countryInput)
        .then((data)=> {
            ctrl.service.countryData = data.data[0];
            ctrl.service.show = true;
            console.warn(ctrl.service.countryData)
            ctrl.service.displayCurrencies = ctrl.service.countryData.currencies.join(",");
            return(data);
        })
        .catch(() => {
            alert("You entered the wrong data. Please try again!")
        })
    }

}


angular
.module('HelloWorldApp')  
.component('countryInfo', {
    template: `
        
        <div class="search">
        <input type="text" ng-model="$ctrl.countryInput" class="searchbar">
        <button class="searchButton" ng-click="$ctrl.getCountryData($ctrl.countryInput)"> Explore </button>
        </div>
        `,
    controller: CountryInfoController
});