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

<div id="mainColumns" class="wrapper">
    <translate></translate>
    <display-data class="aside-1"></display-data>
    <currency class="aside-2"></currency>
</div> 
        `,
    controller: ExploreController
});