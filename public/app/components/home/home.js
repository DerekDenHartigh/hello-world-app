"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
}

angular
.module('HelloWorldApp')  
.component('home', {
    template: `    
    <p ng-if="$ctrl.service.translated">
    Pre-translated user text:
    {{$ctrl.translationText}}
        <br>
    Translated user text:
    {{$ctrl.service.userTranslation}}
    </p>

                <div class="headerdiv">
                <div class="globe">Globe</div>
                </div>
                <div class ="hellocircle">Hello World</div>
                
                <country-info></country-info>

                <div id="mainColumns" class="flex">
                <translate class="flex"></translate>
                <display-data calss="flex"></display-data>
                </div>

    `,
    controller: HomeController
});