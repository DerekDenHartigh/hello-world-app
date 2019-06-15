"use strict";

function TranslateController($scope) {
    
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



    $scope.phrases = [
        {
            foreign: 'This would be the foreign language.',
            english: 'Hello'
        },
        {
            foreign: 'This would be the foreign language.',
            english: 'I would like ____.'
        },
        {
            foreign: 'This would be the foreign language.',
            english: 'Where is ____?'
        },
        {
            foreign: 'This would be the foreign language.',
            english: 'How do you say _____?'
        },
        {
            foreign: 'This would be the foreign language.',
            english: 'What is your name? My name is ____.'
        }
        ];

    
        

    }

    






angular
.module('HelloWorldApp')  
.component('translate', {
    // templateUrl: '/app/components/translate/translate-template.html',
  
    controller: TranslateController,
    template: `
    <div class="displayContainer" ng-if="true">
        <ul>
            <button ng-click="fadeAnimation = !fadeAnimation">Toggle fade</button>
            <li class="firstSampleAnimation" ng-show="fadeAnimation" id="list" ng-repeat="phrase in phrases"> 
            <br>
            <h3> {{ phrase.foreign }} </h3>
            <h3> {{ phrase.english }} </h3>
            <br>
            <!-- <div class="remove" ng-click="removePhrase(phrase)">x</div> -->
            </li>
        </ul>
        <textarea rows="4" cols="50" type="text" ng-model="$ctrl.translationText" placeholder="Here's where you write your message to translate"></textarea>
        <input type="text" ng-model="$ctrl.targetLanguage" placeholder="target language">
        <button ng-click="$ctrl.service.getTranslation($ctrl.translationText, $ctrl.targetLanguage)">translation check button</button>
     </div>
    `

});