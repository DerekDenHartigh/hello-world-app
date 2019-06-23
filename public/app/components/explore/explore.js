"use strict";

function ExploreController(helloWorldService, $location) {
    const ctrl = this;
    ctrl.$location = $location;
    ctrl.service = helloWorldService; 


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