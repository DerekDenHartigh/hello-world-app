"use strict";

function CountryInfoController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.countryData = ctrl.service.countryData;
    ctrl.getCountryData = (countryInput)=> {
        ctrl.service.getCountry(countryInput)
        .then((data)=> {
            ctrl.service.countryData = data.data[0];
            console.warn(ctrl.service.countryData)
            return(data);
        })
        .catch(() => {
            alert("You entered the wrong data. Please try again!")
        })
    }

ctrl.getCountryData();
console.log(ctrl.countryData);
}


angular
.module('HelloWorldApp')  
.component('countryInfo', {
    template: `
   
        <div class="search">Search div
        <input type="text" ng-model="$ctrl.countryInput" class="searchbar">
        <button class="searchButton" ng-click="$ctrl.getCountryData($ctrl.countryInput)"> Explore </button>
        </div>

    <div class = "country-info">
    <h3>{{$ctrl.countryData.name}}</h3>
    <ul>
    <li>{{$ctrl.countryData.capital}}</li>
    <li>{{$ctrl.countryData.languages}}</li>
    <li>{{$ctrl.countryData.currencies}} </li>
    <li>{{$ctrl.countryData.population}} </li>
    </ul>
    </div>`,
    controller: CountryInfoController
});