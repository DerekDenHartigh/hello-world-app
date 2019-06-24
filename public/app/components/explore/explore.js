"use strict";

function ExploreController(helloWorldService, $location, $interval, $scope) {
    const ctrl = this;
    ctrl.$location = $location;
    ctrl.service = helloWorldService; 

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
    <button class="z3" ng-click="$ctrl.$location.path('/home')"> Return Home </button>


<div ng-cloak class="wrapper">

    <translate ng-cloak ng-if="$ctrl.translatable"></translate>
    <div ng-cloak ng-if="!$ctrl.translatable" class="flex" id="untranslatableContainer">
        <h2 ng-cloak id="untranslatableMessage" class="flex dataTitle">Sorry!<br>At this time Watson, our translation AI, doesn't know any of the languages spoken in this country.</h1>
    </div>
    <display-data class="quarter displayContainer"></display-data>
    <currency class="quarter displayContainer"></currency>
</div> 
        `,
    controller: ExploreController
});