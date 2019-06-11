"use strict";

function TranslateController() {

    }

angular
.module('HelloWorldApp')  
.component('translate', {
    templateUrl: '/app/components/translate/translate-template.html',
    controller: TranslateController
});