"use strict";

function TranslateController() {

    }

angular
.module('HelloWorldApp')  
.component('translate', {
    // templateUrl: '/app/components/translate/translate-template.html',
    template: `
    <div class="displayContainer" ng-if="true">
    <p>This is where the translations will be!</p>
    </div>
    `,
    controller: TranslateController
});