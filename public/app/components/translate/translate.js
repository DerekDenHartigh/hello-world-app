"use strict";

function TranslateController(helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.translate;     
    ctrl.service.multipleLanguages = true;
    ctrl.audioTranslatable = ctrl.service.audioTranslatable;  // toggles speakers from view

    $interval(function(){
        ctrl.targetLanguage = ctrl.service.languageNameTranslationArray[0];
        ctrl.service.hasMultipleLanguages(); // makes options list appear as soon as its confirmed that 
    }, 100, 20)

    ctrl.collapseAll = ()=>{
        ctrl.translate= false; 
    }
    
    ctrl.getTranslation = (translationText, targetLanguage)=>{
        ctrl.service.getTranslation(translationText, targetLanguage);
        ctrl.translationText = "";
    };

    ctrl.translatePhrases =(targetLanguage)=>{ // working on getting this to lock/unlock the ng-options by toggling ctrl.service.unlockLanguageOptions until after audio is translated.  (true = unlocked, false = locked, no luck yet)
        ctrl.service.translatePhrases(targetLanguage);
    }
    
    setTimeout(function() {
        if (ctrl.targetLanguage==undefined){return;} // kill function
        ctrl.translatePhrases(ctrl.targetLanguage); 
    }, 1500);

    ctrl.playAudio = (audioclip)=>{
        // console.log("audioclip id:", audioclip)
        let audioTranslation = document.getElementById(`${audioclip}`);
        // console.log("audioTranslation", audioTranslation)
        audioTranslation.play();
    }      
}

angular
.module('HelloWorldApp')  
.component('translate', {
    controller: TranslateController,
    template: `
    <!--<div ng-if="ctrl.loading"> Loading...Please wait a moment... </div>  && !$ctrl.loading-->

    <div class="displayContainer border"  ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle" ng-click="$ctrl.translate=!$ctrl.translate">Translations</h2>
    <div class="translatediv" ng-class="{'show-mobile': $ctrl.translate}">
        
        <div class="tab">
            <button class="tablinks active" onclick="openCategory(event, 'General')">General</button>
            <button class="tablinks" onclick="openCategory(event, 'Lodging')">Lodging</button>
            <button class="tablinks" onclick="openCategory(event, 'Dining')">Dining</button>
            <button class="tablinks" onclick="openCategory(event, 'Transit')">Transit</button>
            <button class="tablinks" onclick="openCategory(event, 'Emergency')">Emergency</button>
            <button class="tablinks" onclick="openCategory(event, 'Custom')">Custom</button>
        </div>
        <div id="General" class="tabcontent" style="display:block"n>
            <span ng-if="$ctrl.service.multipleLanguages"> Toggle through this countries translatable languages: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'general'}"> 
                    <br>
                    <div class="phraseBox">
                        <h4>{{phrase.english}} </h4>
                        <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.foreign}} 
                            <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                                <audio id="{{phrase.id}}">
                                    <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">
Sorry, your browser does not support the audio element.

                                </audio>
                            </i>
                        </h4>    
                    </div>

                </li>
            </ul>
        </div>
        
        <div id="Lodging" class="tabcontent">
            <span ng-if="$ctrl.service.multipleLanguages"> Use the drop down if there are multiple languages for country: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'lodging'}"> 
                    <br>
                    <div class="phraseBox">
                        <h4>{{phrase.english}} </h4>
                        <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.foreign}} 
                            <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                                <audio id="{{phrase.id}}"
                                    <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">
Sorry, your browser does not support the audio element.
                                </audio>
                            </i>
                        </h4>    
                    </div>
                </li>
            </ul>
        </div>


        <div id="Dining" class="tabcontent">
            <span ng-if="$ctrl.service.multipleLanguages"> Use the drop down if there are multiple languages for country: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'dining'}"> 
                    <br>
                    <div class="phraseBox">
                        <h4>{{phrase.english}} </h4>
                        <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.foreign}} 
                            <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                                <audio id="{{phrase.id}}"
                                    <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">
Sorry, your browser does not support the audio element.
                                </audio>
                            </i>
                        </h4>    
                    </div>
                </li>
            </ul>
        </div>

        <div id="Transit" class="tabcontent">
            <span ng-if="$ctrl.service.multipleLanguages"> Use the drop down if there are multiple languages for country: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'transit'}"> 
                    <br>
                    <div class="phraseBox">
                        <h4>{{phrase.english}} </h4>
                        <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.foreign}} 
                            <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                                <audio id="{{phrase.id}}"
                                    <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">
Sorry, your browser does not support the audio element.
                                </audio>
                            </i>
                        </h4>    
                    </div>
                </li>
            </ul>
        </div> 

        <div id="Emergency" class="tabcontent">
            <span ng-if="$ctrl.service.multipleLanguages"> Use the drop down if there are multiple languages for country: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul class="columns">
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'emergency'}"> 
                    <br>
                    <div class="phraseBox">
                        <h4>{{phrase.english}} </h4>
                        <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.foreign}} 
                            <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                                <audio id="{{phrase.id}}"
                                    <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">
Sorry, your browser does not support the audio element.
                                </audio>
                            </i>
                        </h4>    
                    </div>
                </li>
            </ul>
        </div>

        <div id="Custom" class="tabcontent">
            <span ng-if="$ctrl.service.multipleLanguages"> Use the drop down if there are multiple languages for country: <select id="languageSelectionBox" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-disabled="!$ctrl.service.unlockLanguageOptions" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'custom'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>English: {{phrase.english}} </h4>
                    <h4 style="color:#4a6c2f;" class="firstSampleAnimation" ng-show="phrase.show">{{phrase.language}}: {{phrase.foreign}} 
                        <i ng-if="phrase.audioSynthesized" ng-click="$ctrl.playAudio(phrase.id)" class="material-icons playAudioIcon">volume_up
                            <audio id="{{phrase.id}}">
                                <source ng-src="/app/assets/audio/{{phrase.id}}.mp3" type="audio/mpeg">Sorry, your browser does not support the audio element.
                            </audio>                        
                        </i>
                    </h4>
                </div>
                <i class="material-icons deleteIcon" ng-click="$ctrl.service.removePhrase(phrase);">close</i>
                </li>
            </ul>

            <textarea id="customTextArea" rows="4" cols="50" ng-enter="$ctrl.getTranslation($ctrl.translationText, $ctrl.targetLanguage)" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
            <button id="translateButton" class="exploreButton" ng-click="$ctrl.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">Translate</button>
        </div>

    </div>
    </div>
    `
});