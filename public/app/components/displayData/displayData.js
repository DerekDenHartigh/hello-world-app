function DisplayDataController (helloWorldService, $interval) {
    const ctrl = this
    ctrl.service = helloWorldService; 
    // ctrl.UsFormatTranslatedTime = false;
    // ctrl.englishForeignFormatTime = false;
    // ctrl.foreignFormatTranslatedTime = false;

    //add interval function here to make the time

    $interval(function(){ // makes a real time clock
        ctrl.service.getTimeAndDate();
        console.log("tick, tock")
    }, 1000);
    
}

angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class = "displayContainer" ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle"> Other Important Information </h2>
    <h3>{{$ctrl.countryData.name}}</h3>
        <ul>
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
            <li>Population: {{$ctrl.service.countryData.population}} </li>
            <li>What time is it?
                <ul>
                    <li>in English, US format</li>
                    <li>
                    {{$ctrl.service.UsFormatEnglishTime}}
                    </li>

                    <!--<li class="timeConversionHeader" ng-click="$ctrl.englishForeignFormatTime=!$ctrl.englishForeignFormatTime">in English, foreign format</li>
                    <li ng-if="$ctrl.englishForeignFormatTime">
                    {{$ctrl.service.ForeignFormatEnglishTime}}
                    </li>

                    <li class="timeConversionHeader" ng-click="$ctrl.UsFormatTranslatedTime=!$ctrl.UsFormatTranslatedTime">Translated times in US format</li>
                    <li ng-if="$ctrl.UsFormatTranslatedTime" ng-repeat="time in $ctrl.service.UsFormatTranslatedTimeArray">
                        in {{time.languageName}}: {{time.time}}
                    </li>-->

                    <li class="timeConversionHeader">Local time format:</li>
                    <li ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    in {{time.languageName}}: {{time.time}}
                    </li>
                <ul>
            </li>
        </ul>
    </div>`,
    controller: DisplayDataController
});