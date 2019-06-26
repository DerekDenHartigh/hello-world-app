"use strict";

function HomeController(helloWorldService, $interval) {
    const ctrl = this;
    ctrl.service = helloWorldService;
    ctrl.about; ctrl.do; ctrl.work; ctrl.why; ctrl.who; // initializes as falsey undefined
    // ctrl.about= true; ctrl.do= true; ctrl.work= true; ctrl.why= true; ctrl.who = true; // open all for testing
    ctrl.collapseAll = ()=>{
        ctrl.about= false; ctrl.do= false; ctrl.work= false; ctrl.why= false; ctrl.who = false;
    }
    
    //     ctrl.collapseForAbout = () => {
    //     ctrl.about= true; ctrl.do= false; ctrl.work= false; ctrl.why= false; ctrl.who = false;

    // }

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
    <button class="z3" ng-click="$ctrl.about=!$ctrl.about">About</button>
    <div class="z3" id="aboutContainer" ng-if="$ctrl.about">
        <i class="material-icons" id="aboutExit" ng-click="$ctrl.collapseAll()">close</i>
        <h1 class="flex" id="aboutH1">About the Hello World App!</h1>
        <h2 ng-click="$ctrl.do=!$ctrl.do; $ctrl.why=false; $ctrl.work=false; $ctrl.who=false" class="flex aboutH2">What does it do?</h2>
        <p ng-if="$ctrl.do" class="aboutDescription">
            The Hello World App allows users to translate various phrases from a country that they are planning on traveling to. 
            These phrases are based on the categories: General, Lodging, Dining, Transit, Emergency, and Search. 
            The user is also able to quickly learn basic information about the searched country such as the capitol, size, population, languages spoken, etc.
            Further development of this app would allow users to look up intersting things to do within their country for the duration of their stay as well as convert native currencies into currencies that the user is familiar with.
        </p>
        <h2 ng-click="$ctrl.why=!$ctrl.why; $ctrl.do=false; $ctrl.work=false; $ctrl.who=false" class="flex aboutH2">Why should you use it?</h2>
        <p ng-if="$ctrl.why" class="aboutDescription">
            Even though one will not be able to pass as a local, knowing some basic information about the country one is visiting can go a long way in helping one be comfortable in a foreign land.
            It is also incredibly important to be able to communicate with the people of the country one is visiting if they are to get the most of their trip.
            From locating the bathroom to simply engaging with the locals, communication is essential.
        </p>
        <h2 ng-click="$ctrl.work=!$ctrl.work; $ctrl.why=false; $ctrl.do=false; $ctrl.who=false" class="flex aboutH2">How does it work?</h2>
        <p ng-if="$ctrl.work" class="aboutDescription">
            This front-end app was built in the <a class="aboutAnchor" href="https://angularjs.org/">AngularJS 1.7.8 framework</a> and is integrated with various APIs for data gathering and rendering.
            The app calls upon the <a class="aboutAnchor" href="https://rapidapi.com/fayder/api/rest-countries-v1">REST Countries V1 API</a> to render the country information as well as tell the <a class="aboutAnchor" href="https://www.ibm.com/watson/services/language-translator/">Watson Translate API</a> what languages to convert the sample phrases and user input into.
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
                <p class="developerBio">I'm a front-end developer, GIS Specialist, and data visualizer. I loved making sure this app provided efficient access to data and maintained aesthetic integrity.</p>
            </div>
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/derek-denhartigh/"> Derek DenHartigh</a></h3>
                <img fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/DerekPic.jpg" class="flex developerPic">
                <p class="developerBio">I'm a former teacher and lab analyst who has recently converted to the tech field. For this project, I had the most fun wiring up the IBM Watson API and the currency conversion module.</p>
            </div>
            <div class="devContainer">
                <h3 class="developerName"><a class="devAnchor" href="https://www.linkedin.com/in/dave-gillespie/"> Dave Gillespie</a></h3>
                <img fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-src="app/assets/DavePic.jpg" class="flex developerPic">
                <p class="developerBio">I’m a logistics manager turned web developer. For this project, I liked working with the IBM Watson translate API and adding css/styling to the functionality.</p>
            </div>
        </div>
    </div>


            <div class="globe"><img class="imgGlobe" src="helloworld copy.png"></div>
            <div class ="hellocircle">Hello World</div>

            <div class="search">
            <country-info></country-info>
            </div>
    
</div>  
                `,
    controller: HomeController
});