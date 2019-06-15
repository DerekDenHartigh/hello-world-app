"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
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
                
                <country-info></country-info>

                <div class="flex">
                <translate></translate>
                <display-data></display-data>
                </div>
    `,
    controller: HomeController
});