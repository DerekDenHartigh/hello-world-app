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

    <div class="headerdiv">
        <div class="globe">
            <img class="imgGlobe" src="helloworld copy.png">
        </div>
    </div>
<div class ="hellocircle">Hello World</div>

<div id="mainColumns" class="flex2">
    <translate class="flex"></translate>

    <display-data class="flex"></display-data>
    <currency class="flex"></currency>
</div> 
        `,
    controller: ExploreController
});