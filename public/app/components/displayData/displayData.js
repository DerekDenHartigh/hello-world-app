function DisplayDataController (helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService; 
    ctrl.importantinfo; ctrl.currency; 
    // ctrl.about= true; ctrl.do= true; ctrl.work= true; ctrl.why= true; ctrl.who = true; // open all for testing
    ctrl.collapseAll = ()=>{
        ctrl.importantinfo= false; 
    }


    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
    }, 1000);
    
}



{/* <div class="z3" id="aboutContainer" ng-if="$ctrl.about">
<i class="material-icons" id="aboutExit" ng-click="$ctrl.collapseAll()">close</i>
<h1 class="flex" id="aboutH1">About the Hello World App!</h1>
<h2 ng-click="$ctrl.do=!$ctrl.do; $ctrl.why=false; $ctrl.work=false; $ctrl.who=false" class="flex aboutH2">What does it do?</h2>
<p ng-if="$ctrl.do" class="aboutDescription"> */}




angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class="displayContainer" ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle" ng-click="$ctrl.importantinfo=!$ctrl.importantinfo"> Other Important Information </h2>
    <div class="importantinfodiv" ng-if="$ctrl.importantinfo"><h3>{{$ctrl.countryData.name}}</h3>
        <ul id="countryDataList">
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
            <li>Population: {{$ctrl.service.countryData.population}} </li>
            <li>What time is it?
                <ul>
                    <li class="timeConversionHeader">in English, US format</li>
                    <li>
                    {{$ctrl.service.UsFormatEnglishTime}}
                    </li>

                    <li class="timeConversionHeader">Local time format(s):</li>
                    <li ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    in {{time.languageName}}: {{time.time}}
                    </li>
                <ul>
            </li>
        </ul>
        </div>
    </div>`,
    controller: DisplayDataController
});