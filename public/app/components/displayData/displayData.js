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
    <div ng-if="$ctrl.service.countryQueried">
    <h2 class="dataTitle"> Important Information </h2>
    <h3>{{$ctrl.countryData.name}}</h3>
        <ul id="countryDataList">
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageDisplayList}}</li>
            <li>Currencies: {{$ctrl.service.currencyDisplayList}} </li>
            <li>What time is it?
                <ul>
                    <li class="timeConversionHeader">US format:</li>
                    <li>
                    {{$ctrl.service.UsFormatEnglishTime}}
                    </li>

                    <li class="timeConversionHeader">{{$ctrl.service.countryData.name}} format(s):</li>
                    <li ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    <!-- in {{time.languageName}}: --> {{time.time}}
                    </li>
                <ul>
            </li>
        </ul>
    </div>`,
    controller: DisplayDataController
});