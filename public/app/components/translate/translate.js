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
      <button class="tablinks" onclick="openCategory(event, 'General')">General</button>
      <button class="tablinks" onclick="openCategory(event, 'Lodging')">Lodging</button>
      <button class="tablinks" onclick="openCategory(event, 'Dining')">Dining</button>
      <button class="tablinks" onclick="openCategory(event, 'Transit')">Transit</button>
      <button class="tablinks" onclick="openCategory(event, 'Emergency')">Emergency</button>
      <button class="tablinks" onclick="openCategory(event, 'Search')">Search</button>
    </div>
    
    <div id="General" class="tabcontent">
    <h3>General</h3>
        <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
        <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
    
        <ul>
        <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.general"> 
         <br>
        <div class="phraseBox">
            <h4>English: {{ phrase.english }} </h4>
            <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
        </div>
        </li>
        </ul>
        </div>
    
    <div id="Lodging" class="tabcontent">
      <h3>Lodging</h3>
      <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
        <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
      
        <ul>
        <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.lodging"> 
         <br>
        <div class="phraseBox">
            <h4>English: {{ phrase.english }} </h4>
            <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
        </div>
        </li>
        </ul>
        </div>
    </div>


    <div id="Dining" class="tabcontent">
      <h3>Dining</h3>
      <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
    <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
    <ul>
    <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.dining"> 
     <br>
    <div class="phraseBox">
        <h4>English: {{ phrase.english }} </h4>
        <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
    </div>
    </li>
    </ul>
    </div>
    </div>

    <div id="Transit" class="tabcontent">
      <h3>Transit</h3>
      <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
        <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
        <ul>
        <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.transit"> 
         <br>
        <div class="phraseBox">
            <h4>English: {{ phrase.english }} </h4>
            <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
        </div>
        </li>
        </ul>
        </div> 
    </div>

    <div id="Emergency" class="tabcontent">
      <h3>Emergency</h3>
      <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
        <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
        <ul>
        <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.emergency"> 
         <br>
        <div class="phraseBox">
            <h4>English: {{ phrase.english }} </h4>
            <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
        </div>
        </li>
        </ul>
        </div>
    </div>
    
    <div id="Search" class="tabcontent">
    <h3>Search</h3>
    <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages:
    <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>

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

    </div>
    
    `

});