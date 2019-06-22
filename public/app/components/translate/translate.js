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

    <h2>Translations</h2>
    <p>Click on the buttons inside the tabbed menu:</p>
    
    <div class="tab">
      <button class="tablinks" onclick="openCity(event, 'Common')">Common</button>
      <button class="tablinks" onclick="openCity(event, 'Paris')">Paris</button>
      <button class="tablinks" onclick="openCity(event, 'Tokyo')">Tokyo</button>
    </div>
    
    <div id="Common" class="tabcontent">
    <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
    <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>

 <h2 class="dataTitle"> Common Phrases </h2>
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

    <textarea rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
    <button class="exploreButton" ng-click="$ctrl.translationHandler()">Translate</button>

    </div>
    
    <div id="Paris" class="tabcontent">
      <h3>Paris</h3>
      <p>Paris is the capital of France.</p> 
    </div>
    
    <div id="Tokyo" class="tabcontent">
      <h3>Tokyo</h3>
      <p>Tokyo is the capital of Japan.</p>
    </div>

    </div>
    
    `

});