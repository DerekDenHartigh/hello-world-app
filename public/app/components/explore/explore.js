"use strict";

function ExploreController(helloWorldService, $location, $interval, $scope) {
    const ctrl = this;
    ctrl.service = helloWorldService; 
    ctrl.$location = $location;
    ctrl.translatable = ctrl.service.canCodeBeTranslated // hides translation module if country doesn't have a watson translatable language

    $interval(function() {
        if(ctrl.service.countrySearched === false){
            // console.error("no country has been searched, back to home with you!");
            ctrl.$location.path('/home');
        };
        ctrl.translatable = ctrl.service.canCodeBeTranslated // hides translation module if country doesn't have a watson translatable language
    }, 200, 10);

}


angular
.module('HelloWorldApp')  
.component('explore', {
    template: `
    <div id="exploreBackground"></div>
    <div class="z3explore">
        <div class="earth" ng-click="$ctrl.$location.path('/home')"><img class="imgEarth" ng-src="helloworld copy.png" ></div>
        <h2 id="countryName">{{$ctrl.service.countryData.name}} : {{$ctrl.service.countryData.nativeName}}</h2>
        <div id="homeButton" ng-click="$ctrl.$location.path('/home')">Home</div>
    </div>

    <div ng-cloak class="wrapper">
        <translate ng-cloak ng-if="$ctrl.translatable"></translate>

        <div ng-cloak ng-if="!$ctrl.translatable" class="flex ng-cloak" id="untranslatableContainer">
            <h2 id="untranslatableMessage" class="flex dataTitle" ng-cloak>Sorry!<br>At this time Watson, our translation AI, doesn't know any of the languages spoken in this country.</h1>
        </div>
        <div class="people"><img class="imgpeople" src="HELLOPPLshadow.png"></div>
        <display-data class="quarter displayContainer border background2"></display-data>
        <currency class="quarter displayContainer border background2"></currency>
    </div>
        `,
    controller: ExploreController
});