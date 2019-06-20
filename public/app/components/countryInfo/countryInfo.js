"use strict";

function CountryInfoController(helloWorldService, $location) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.countryData = ctrl.service.countryData;
    ctrl.$location = $location;
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
    <div class="search">
        <h3>Where are you off to?</h3>
        <input type="text" ng-model="$ctrl.countryInput" class="searchbar">
        <button class="searchButton" ng-click="$ctrl.getCountryData($ctrl.countryInput); $ctrl.translatePhrases($ctrl.targetLanguage); $ctrl.$location.path('/explore')"> Explore </button>
    </div> 
        `,
    controller: CountryInfoController
});