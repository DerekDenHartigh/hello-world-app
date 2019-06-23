"use strict";

function DisplayDataController (helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService; 

    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
    }, 1000);
    
}

angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle"> Other Important Information </h2>
    <h3>{{$ctrl.countryData.name}}</h3>
        <ul id="countryDataList">
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
            <li>Population: {{$ctrl.service.countryData.population}} </li>
            <li>What time is it?</li>
        </ul>
        <div id="timeContainer">
            <div class="timeBox" id="timeLeft">
                <p class="timeConversionHeader">in English, US format</p>
                <p>{{$ctrl.service.UsFormatEnglishTime}}</p>
            </div>
            <div class="timeBox" id="timeRight">
            <p class="timeConversionHeader">Local time format(s):</p>
            <p ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
            in {{time.languageName}}: {{time.time}}</p>
            </div>
        </div>
        
    </div>`,
    controller: DisplayDataController
});