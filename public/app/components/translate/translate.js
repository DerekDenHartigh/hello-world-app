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
    
// I would like ____
// Where is ____?
// How do you say _____?
// What is that?
// How much is it?
// What is your name? My name is ____.
// Where are you from? I am from _____.
// What do you do for work? I am a _____.
// Where am I?
// Where is the bathroom?

    // ctrl.service.phrases = [
    //     {
    //         foreign: ctrl.service.translatedPhrase[0],
    //         english: 'Hello'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[1],
    //         english: 'Goodbye'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[2],
    //         english: 'I would like    .'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[3],
    //         english: 'Where is   ?'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[4],
    //         english: 'How do you say    ?'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[5],
    //         english: 'How much is this?'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[6],
    //         english: 'What is your name? My name is     .'
    //     },
    //     {
    //         foreign: ctrl.service.translatedPhrase[7],
    //         english: 'Where is the bathroom?'
    //     }
    //     ];

    }

angular
.module('HelloWorldApp')  
.component('translate', {
    // templateUrl: '/app/components/translate/translate-template.html',
  
    controller: TranslateController,
    template: `
    <div class="displayContainer">
        <ul>
            <button ng-click="$ctrl.translatePhrases($ctrl.targetLanguage)">Translate Phrases</button>
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
        <select ng-model="$ctrl.targetLanguage" ng-options="language for language in $ctrl.service.languageNameArray"></select>
        <button ng-click="$ctrl.service.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">translation check button</button>
        <p ng-if="$ctrl.service.translated">
            Pre-translated user text: {{$ctrl.translationText}}
            <br>
            Translated user text: {{$ctrl.service.userTranslation}}
        </p> 
     
    </div>
    `

});

// ng-if="$ctrl.service.translated"