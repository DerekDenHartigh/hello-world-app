"use strict";

function HomeController(helloWorldService, $interval) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.about; ctrl.do; ctrl.work; ctrl.why; ctrl.who;
    ctrl.collapseAll = ()=>{
        ctrl.about= false; ctrl.do= false; ctrl.work= false; ctrl.why= false; ctrl.who = false;
    }

    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
    }, 1000);
}

angular
.module('HelloWorldApp')  
.component('home', {
    template: `

<div class="homepage">
    <!-- About pop up -->
    <div class="z2" id="plexiglass" ng-click="$ctrl.collapseAll()" ng-if="$ctrl.about"></div>

    <div class="z3home">
        <div id="aboutButton" ng-click="$ctrl.about=!$ctrl.about">About</div>
    </div>

    <div class="z3" id="aboutContainer" ng-if="$ctrl.about">
        <i class="material-icons" id="aboutExit" ng-click="$ctrl.collapseAll()">close</i>
        <h1 class="flex" id="aboutH1">About the Hello World App!</h1>
        <h2 ng-click="$ctrl.do=!$ctrl.do; $ctrl.why=false; $ctrl.work=false; $ctrl.who=false" class="flex aboutH2">What does it do?</h2>
        <p ng-if="$ctrl.do" class="aboutDescription">
            The Hello World App allows gives users instant access to text and audio for various pre-written, categorized phrases that are dynamically generated depending on the country queried. 
            These phrases are based on the categories: General, Lodging, Dining, Transit, Emergency, and Custom. If a user needs a more specific translation, the custom category allows the user to input their own english text and translate it instantly to text & audio.
            The user is also able to quickly learn basic information about the searched country such as the capitol, size, population, languages spoken, date & time format, etc.
            Further development of this app would allow users to look up intersting things to do within their country for the duration of their stay as well as recognize and translate user text and speech input from languages outside of English.
        </p>
        <h2 ng-click="$ctrl.why=!$ctrl.why; $ctrl.do=false; $ctrl.work=false; $ctrl.who=false" class="flex aboutH2">Why should you use it?</h2>
        <p ng-if="$ctrl.why" class="aboutDescription">
            Even though one will not be able to pass as a local, knowing some basic information about the country one is visiting can go a long way in helping one be comfortable in a foreign land.
            It is also incredibly important to be able to communicate with the people of the country one is visiting if they are to get the most of their trip. Our app also converts from local currency to USD and vice versa to help inform the user about their purchases while travelling.
            From locating the bathroom to simply engaging with the locals, communication is essential.
        </p>
        <h2 ng-click="$ctrl.work=!$ctrl.work; $ctrl.why=false; $ctrl.do=false; $ctrl.who=false" class="flex aboutH2">How does it work?</h2>
        <p ng-if="$ctrl.work" class="aboutDescription">
            This front-end app was built in the <a class="aboutAnchor" href="https://angularjs.org/">AngularJS 1.7.8 framework</a> and is integrated with various APIs for data gathering and rendering.
            The app calls upon the <a class="aboutAnchor" href="https://rapidapi.com/fayder/api/rest-countries-v1">REST Countries V1 API</a> to render the country information as well as tell set parameters for <a class="aboutAnchor" href="https://www.ibm.com/watson/services/language-translator/">IBM Watson Translate</a>, <a class="aboutAnchor" href="https://www.ibm.com/watson/services/text-to-speech/">IBM Watson Text to Speech,</a> and <a class="aboutAnchor" href="https://fixer.io/">fixer.io/</a> which determine what languages to translate the phrases into as well as what currency conversions to perform.
        </p>
        <h2 ng-click="$ctrl.who=!$ctrl.who; $ctrl.why=false; $ctrl.work=false; $ctrl.do=false" class="flex aboutH2">Who Made it?</h2>
        <div ng-if="$ctrl.who" class="flex" id="mainDeveloperContainer">
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/hannah-m-barker/"> Hannah Barker</a></h3>
                <img  fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/HannahPic.jpg" class="flex developerPic">
                <!-- <img ng-src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png" class="developerPic"> -->
                <p class="developerBio">Interior Designer turned Front End Web Developer. I enjoy all forms of design, and I focused on creating the graphic for this app along with the functionality for great user experience.</p>
            </div>
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/jessa-challa/"> Jessa Challa</a></h3>
                <img fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/JessaPic.jpg" class="flex developerPic">
                <p class="developerBio">A front-end developer, GIS Specialist, and data visualizer. I loved making sure this app provided efficient access to data while maintaining aesthetic integrity.</p>
            </div>
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/derek-denhartigh/"> Derek DenHartigh</a></h3>
                <img fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/DerekPic.jpg" class="flex developerPic">
                <p class="developerBio">Former teacher and lab analyst who has recently converted to the tech field. For this project, I had the most fun wiring up the IBM Watson APIs and the currency conversions.</p>
            </div>
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/dave-gillespie/"> Dave Gillespie</a></h3>
                <img fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/DavePic.jpg" class="flex developerPic">
                <p class="developerBio">A logistics manager turned web developer. For this project, I liked working on the IBM Watson translate API and adding css/styling to the functionality.</p>
            </div>
        </div>
    </div>

            <div class="globe"><img class="imgGlobe" src="helloworld.png"></div>
            <div class ="hellocircle"><div class="hellocircle__inner">Hello World</div></div>

            <div class="search">
            <country-info></country-info>
            </div>
</div>  
                `,
    controller: HomeController
});
