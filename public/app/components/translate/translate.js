"use strict";

function TranslateController($scope, $q, helloWorldService) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.targetLanguage;
    ctrl.service.showTranslatedPhrases = false; // hides untranslated phrases
    
    ctrl.translationHandler = ()=>{
        ctrl.service.getTranslation(ctrl.translationText, ctrl.targetLanguage);
        ctrl.translatePhrases(ctrl.targetLanguage);
    };

    ctrl.translatePhrases =(targetLanguage)=>{
        if (!ctrl.targetLanguage){ // kill the function if target language isn't selected
            alert("Please select a language to convert these phrases to.")
            ctrl.service.showTranslatedPhrases = false; // hide any untranslated text
            return;
        } 
        ctrl.service.translatePhrases(targetLanguage);
    }
}

angular
.module('HelloWorldApp')  
.component('translate', {
    controller: TranslateController,
    template: `
    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
    
    <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
    <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select>
    </span>

    <div class="the-phrases">
    <h2 class="dataTitle"> Common Phrases Translated </h2>
        <ul>
            <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases"> 
                <br>
                <div class="phraseBox">
                    <h3>English: {{ phrase.english }} </h3>
                    <h3 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h3>
                </div>
                    <i class="material-icons" ng-click="$ctrl.service.removePhrase(phrase);">close</i>
            </li>
        </ul>
    </div>
   
        <textarea rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
        <!--<input type="text" ng-model="$ctrl.targetLanguage" placeholder="target language">-->

        <button id="searchButton" ng-click="$ctrl.translationHandler()">Translate</button>
    
    </div>

        <!--<p ng-if="$ctrl.service.translated">
            Pre-translated user text: {{$ctrl.translationText}}
            <br>
            Translated user text: {{$ctrl.service.userTranslation}}
        </p>-->
     
    
    `

});