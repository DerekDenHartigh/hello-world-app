"use strict";

function DisplayDataController (helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService; 

    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
    }, 1000);
    
}

angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle"> Other Important Information </h2>
    <h3>{{$ctrl.countryData.name}}</h3>
        <ul id="countryDataList">
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
            <li>Population: {{$ctrl.service.countryData.population}} </li>
            <li>What time is it?</li>
        </ul>
        <div id="timeContainer">
            <div class="timeBox" id="timeLeft">
                <p class="timeConversionHeader">in English, US format</p>
                <p>{{$ctrl.service.UsFormatEnglishTime}}</p>
            </div>
            <div class="timeBox" id="timeMid">
                <canvas id="canvas">
            </div>
            <div class="timeBox" id="timeRight">
            <p class="timeConversionHeader">Local time format(s):</p>
            <p ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
            in {{time.languageName}}: {{time.time}}</p>
            </div>
        </div>
        
    </div>`,
    controller: DisplayDataController
});

/** I stole this clock code from https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start */

// var canvas = document.getElementById("canvas");
var canvas = angular.element( document.querySelector( '#canvas' ) );
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
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
  var ang;
  var num;
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