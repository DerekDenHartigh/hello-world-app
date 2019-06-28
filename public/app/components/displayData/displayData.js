function DisplayDataController (helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService; 
    ctrl.importantinfo; 
    ctrl.collapseAll = ()=>{
        ctrl.importantinfo= false; 
    }

    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
    }, 1000);
    
}

angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class="border2" ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle" ng-click="$ctrl.importantinfo=!$ctrl.importantinfo"> Other Important Information </h2>
    <div class="translatediv" ng-class="{'show-mobile': $ctrl.importantinfo}"><h3>{{$ctrl.countryData.name}}</h3>
        <ul id="countryDataList">
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
                <ul>
                    <li class="timeConversionHeader">Time in US format:</li>
                    <li>
                    {{$ctrl.service.UsFormatEnglishTime}}
                    </li>

                    <li class="timeConversionHeader">Time in {{$ctrl.service.countryData.name}} format(s):</li>
                    <li ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    <!-- in {{time.languageName}}: --> {{time.time}}
                    </li>
                <ul>
            </li>
        </ul>
        </div>
    </div>`,
    controller: DisplayDataController
});