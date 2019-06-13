"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;

    ctrl.service.getCountry(); // just for testing

}

angular
.module('HelloWorldApp')  
.component('home', {
    // templateUrl: '/app/components/home/homeTemplate.html',
    // templateUrl: './homeTemplate.html',
    // templateUrl: "/homeTemplate.html",
    template: `
    <div class="headerdiv">
                <div class="globe">Globe</div>
                </div>
                <div class ="hellocircle">Hello World</div>
                <div class="search">Search div
                <input type="text" class="searchbar"/>
                <button class="searchButton" ng-click="$ctrl.getSearch($ctrl.searchVar)"> Explore </button>
                </div>
    `,
    controller: HomeController
});