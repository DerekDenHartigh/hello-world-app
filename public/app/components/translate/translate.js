"use strict";

function TranslateController(helloWorldService) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.targetLanguage;
    ctrl.service.showTranslatedPhrases = false; // hides untranslated phrases
    
    ctrl.getTranslation = (translationText, targetLanguage)=>{
        console.log("getTranslation");
        ctrl.service.getTranslation(translationText, targetLanguage);
        ctrl.translationText = "";
    };

    ctrl.translatePhrases =(targetLanguage)=>{
        console.log("Translation Phrases");
        // if (!ctrl.targetLanguage){ // kill the function if target language isn't selected
        //     alert("Please select a language to convert these phrases to.")
        //     ctrl.service.showTranslatedPhrases = false; // hide any untranslated text
        //     return;
        // } 
        ctrl.service.translatePhrases(targetLanguage);
    }

    // automatically translates phrases after a delay that allows for params to be set before calling
    setTimeout(function() {
        if (ctrl.targetLanguage==undefined){return;} // kill function
        ctrl.translatePhrases(ctrl.targetLanguage); 
    }, 1500); 

}

angular
.module('HelloWorldApp')  
.component('translate', {
    controller: TranslateController,
    template: `

    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
<div class="earth"><img class="imgEarth" src="helloworld copy.png"></div>

        <h2>Translations</h2>
        
        <div class="tab">
            <button class="tablinks" onclick="openCategory(event, 'General')">General</button>
            <button class="tablinks" onclick="openCategory(event, 'Lodging')">Lodging</button>
            <button class="tablinks" onclick="openCategory(event, 'Dining')">Dining</button>
            <button class="tablinks" onclick="openCategory(event, 'Transit')">Transit</button>
            <button class="tablinks" onclick="openCategory(event, 'Emergency')">Emergency</button>
            <button class="tablinks" onclick="openCategory(event, 'Custom')">Custom</button>
        </div>
        
        <div id="General" class="tabcontent">
            <h3>General</h3>
            <span class=""> Use the drop down if there are multiple languages for country: <select ng-init="$ctrl.targetLanguage=$ctrl.service.languageNameTranslationArray[0]" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'general'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>{{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>
        
        <div id="Lodging" class="tabcontent">
            <h3>Lodging</h3><span class=""> Use the drop down if there are multiple languages for country: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'lodgin'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>{{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>


        <div id="Dining" class="tabcontent">
            <h3>Dining</h3><span class=""> Use the drop down if there are multiple languages for country: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'dining'}"> 
                        <br>
                <div class="phraseBox">
                    <h4>{{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>

        <div id="Transit" class="tabcontent">
            <h3>Transit</h3><span class=""> Use the drop down if there are multiple languages for country: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'transit'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>{{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div> 

        <div id="Emergency" class="tabcontent">
            <h3>Emergency</h3><span class=""> Use the drop down if there are multiple languages for country: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'emergency'}"> 
                    <br>
                <div class="phraseBox">
                    <h4> {{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>
        
        <div id="Custom" class="tabcontent">
            <h3>Custom</h3><span class=""> Use the drop down if there are multiple languages for country: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'search'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>{{ phrase.english }} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.foreign }} </h4>
                </div>
                <i class="material-icons" ng-click="$ctrl.service.removePhrase(phrase);">close</i>
                </li>
            </ul>

            <textarea id="customTextArea" rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
            <button class="exploreButton" ng-click="$ctrl.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">Translate</button>
        </div>

    </div>
    
    `

});