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
    <form ng-cloak ng-submit="$ctrl.getCountryData($ctrl.countryInput); $ctrl.$location.path('/explore');">
        <div class="search2">
            <h3>Where are you off to?</h3>
            <input placeholder="Search By Country" type="text" ng-model="$ctrl.countryInput" class="searchbar">
            <button ng-cloak class="searchButton"> Explore </button>
        </div>
    </form> 
        `,
    controller: CountryInfoController
});