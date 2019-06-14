"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    // ctrl.service.getCountry(); // just for testing
    // ctrl.service.getTranslation();
}

angular
.module('HelloWorldApp')  
.component('home', {
    template: `
    <h1>I am the Home Template!</h1>

    <textarea rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate">
    </textarea>
    <input type="text" ng-model="$ctrl.targetLanguage" placeholder="target language">
    <button ng-click="$ctrl.service.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">translation check button</button>
    
    <p ng-if="$ctrl.service.translated">
    Pre-translated user text:
    {{$ctrl.translationText}}
        <br>
    Translated user text:
    {{$ctrl.service.userTranslation}}
    </p>
    `,
    controller: HomeController
});