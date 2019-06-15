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
            ctrl.service.displayCurrencies = ctrl.service.countryData.currencies.join(", ");
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
    <div class="search">Where would you like to go?
        <input type="text" ng-model="$ctrl.countryInput" class="searchbar">
        <button class="searchButton" ng-click="$ctrl.getCountryData($ctrl.countryInput)"> Explore </button>
    </div>
<!-- I think this is all in displayData
    <div class = "country-info">
        <h3>{{$ctrl.countryData.name}}</h3>
        <ul>
            <li>{{$ctrl.countryData.capital}}</li>
            <li>{{$ctrl.countryData.languages}}</li>
            <li>{{$ctrl.countryData.currencies}}</li>
            <li>{{$ctrl.countryData.population}}</li>
        </ul>
    </div>
-->  
   
        `,
    controller: CountryInfoController
});