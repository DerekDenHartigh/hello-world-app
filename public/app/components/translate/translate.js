"use strict";

function TranslateController($scope, $q, helloWorldService) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.targetLanguage;
    ctrl.fadeAnimation = false; // hides untranslated phrases

    ctrl.translatePhrases =(targetLanguage)=>{
        if (!ctrl.targetLanguage){ // kill the function if target language isn't selected
            alert("Please select a language to convert these phrases to.")
            ctrl.fadeAnimation = false; // hide any untranslated text
            return;
        } 
        return $q(()=>{ctrl.service.translatePhrases(targetLanguage);})
        .then(()=>{
            ctrl.fadeAnimation = true; // fades in translated phrases
        });
    }
}

angular
.module('HelloWorldApp')  
.component('translate', {
    controller: TranslateController,
    template: `
    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
    <span> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
    <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select>
    <h2 class="dataTitle"> Common Phrases Translated </h2>
        <ul>
            <li id="list" ng-repeat="phrase in $ctrl.service.phrases"> 
                <br>
                <h3> {{ phrase.english }} </h3>
                <h3 class="firstSampleAnimation" ng-show="$ctrl.fadeAnimation"> {{ phrase.foreign }} </h3>
                <br>
            <!-- <div class="remove" ng-click="removePhrase(phrase)">x</div> -->
            </li>
        </ul>

        <textarea rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
        <!--<input type="text" ng-model="$ctrl.targetLanguage" placeholder="target language">-->

        <button class="searchButton" ng-click="$ctrl.service.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">Translate</button>

        <p ng-if="$ctrl.service.translated">
            Pre-translated user text: {{$ctrl.translationText}}
            <br>
            Translated user text: {{$ctrl.service.userTranslation}}
        </p> 
     
    </div>
    `

});