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
    }, 200, 10);

}


angular
.module('HelloWorldApp')  
.component('explore', {
    template: `
    <button class="z3" ng-click="$ctrl.$location.path('/home')"> Return Home </button>


<div class="wrapper">
    <translate></translate>
    <display-data></display-data>
    <currency></currency>
</div> 
        `,
    controller: ExploreController
});