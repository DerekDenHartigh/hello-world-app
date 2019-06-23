"use strict";
/** I stole this clock code from https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start */
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  let grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  let num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

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
            <span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-init="$ctrl.targetLanguage=$ctrl.service.languageNameTranslationArray[0]" ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'general'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>English: {{ phrase.english }} </h4>
                    <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>
        
        <div id="Lodging" class="tabcontent">
            <h3>Lodging</h3><span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'lodgin'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>English: {{ phrase.english }} </h4>
                    <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>


        <div id="Dining" class="tabcontent">
            <h3>Dining</h3><span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'dining'}"> 
                        <br>
                <div class="phraseBox">
                    <h4>English: {{ phrase.english }} </h4>
                    <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>

        <div id="Transit" class="tabcontent">
            <h3>Transit</h3><span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'transit'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>English: {{ phrase.english }} </h4>
                    <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div> 

        <div id="Emergency" class="tabcontent">
            <h3>Emergency</h3><span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'emergency'}"> 
                    <br>
                <div class="phraseBox">
                    <h4>English: {{ phrase.english }} </h4>
                    <h4 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h4>
                </div>
                </li>
            </ul>
        </div>
        
        <div id="Search" class="tabcontent">
            <h3>Search</h3><span class=""> If there are multiple languages associated with the country searched, you may use the drop down to toggle through the differenct languages: <select ng-model="$ctrl.targetLanguage" ng-change="$ctrl.translatePhrases($ctrl.targetLanguage)" ng-options="language for language in $ctrl.service.languageNameTranslationArray"></select></span>
            <ul>
                <li id="list" class="phraseListItem" ng-repeat="phrase in $ctrl.service.phrases | filter: {category:'search'}"> 
                    <br>
                <div class="phraseBox">
                    <h3>English: {{ phrase.english }} </h3>
                    <h3 class="firstSampleAnimation" ng-show="$ctrl.service.showTranslatedPhrases">{{ phrase.language }}: {{ phrase.foreign }} </h3>
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