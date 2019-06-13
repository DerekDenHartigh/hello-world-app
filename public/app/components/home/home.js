"use strict";

function HomeController(helloWorldService) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.about, ctrl.do, ctrl.work, ctrl.why, ctrl.who = false;
    // ctrl.service.getCountry(); // just for testing

}

angular
.module('HelloWorldApp')  
.component('home', {
    // templateUrl: '/app/components/home/homeTemplate.html',
    // templateUrl: './homeTemplate.html',
    // templateUrl: "/homeTemplate.html",
    template: `
    <button ng-click="$ctrl.about=!$ctrl.about">About Page Toggle Button</button>
    <div class="flex" id="aboutContainer" ng-if="$ctrl.about">
    <h1 class="flex" id="aboutH1">About the Hello World App!</h1>
    <h2 ng-click="$ctrl.do=!$ctrl.do" class="flex aboutH2" >What does it do?</h2>
        <p ng-if="$ctrl.do" class="aboutDescription">
            The Hello World App allows users to research a country that they are planning on traveling to.
            The user is able to quickly learn basic information about the searched country such as the capitol, size, population, languages spoken, etc.
            In addition to this information, the user will also be given a list of common phrases that have been translated into the searched country's language(s) as well as allow the user to translate their own custom phrases into the searched country's language(s).
            Further development of this app would allow users to look up intersting things to do within their country for the duration of their stay as well as convert native currencies into currencies that the user is familiar with.
        </p>
    <h2 ng-click="$ctrl.why=!$ctrl.why" class="flex aboutH2" >Why should you use it?</h2>
        <p ng-if="$ctrl.why" class="aboutDescription">
            Even though one will not be able to pass as a local, knowing some basic information about the country one is visiting can go a long way in helping one be comfortable in a foreign land.
            It is also incredibly important to be able to communicate with the people of the country one is visiting if they are to get the most of their trip.
            From locating the bathroom to simply engaging with the locals, communication is essential.
        </p>
    <h2 ng-click="$ctrl.work=!$ctrl.work" class="flex aboutH2" >How does it work?</h2>
        <p ng-if="$ctrl.work" class="aboutDescription">
            This front-end app was built in the <a class="aboutAnchor" href="https://angularjs.org/">AngularJS 1.7.8 framework</a> and is integrated with various APIs for data gathering and rendering.
            The app calls upon the <a class="aboutAnchor" href="https://rapidapi.com/fayder/api/rest-countries-v1">REST Countries V1 API</a> to render the country information as well as tell the <a class="aboutAnchor" href="https://www.ibm.com/watson/services/language-translator/">Watson Translate API</a> what languages to convert the sample phrases and user input into.
        </p>
    <h2 ng-click="$ctrl.who=!$ctrl.who" class="flex aboutH2" >Who Made it?</h2>
    <div ng-if="$ctrl.who" class="flex" id="mainDeveloperContainer">
        <div class="flex devContainer">
            <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/hannah-m-barker/"> Hannah Barker</a></h3>
            <img ng-src="../../assets/HannahPic.jpg" class="flex developerPic">
            <p class="developerBio">I'm super cool and I helped to develop this app!</p>
        </div>
        <div class="flex devContainer">
            <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/jessa-challa/"> Jessa Challa</a></h3>
            <img ng-src="../../assets/JessaPic.jpg" class="flex developerPic">
            <p class="developerBio">I'm super cool and I helped to develop this app!</p>
        </div>
        <div class="flex devContainer">
            <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/derek-denhartigh/"> Derek DenHartigh</a></h3>
            <img ng-src="../../assets/DerekPic.jpg" class="flex developerPic">
            <p class="developerBio">I'm super cool and I helped to develop this app!</p>
        </div>
        <div class="flex devContainer">
            <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/dave-gillespie/"> Dave Gillespie</a></h3>
            <img ng-src="../../assets/DavePic.jpg" class="flex developerPic">
            <p class="developerBio">I'm super cool and I helped to develop this app!</p>
        </div>
    </div>
</div>
    `,
    controller: HomeController
});