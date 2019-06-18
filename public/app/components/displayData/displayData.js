function DisplayDataController (helloWorldService ) {
    const ctrl = this
    ctrl.service = helloWorldService; 
    ctrl.UsFormatTranslatedTime = false;
    ctrl.englishForeignFormatTime = false;
    ctrl.foreignFormatTranslatedTime = false;
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
                    <h2>in English, US format</h2>
                    <li>
                    {{$ctrl.service.UsFormatEnglishTime}}
                    </li>

                    <h2 class="timeConversionHeader" ng-click="$ctrl.englishForeignFormatTime=!$ctrl.englishForeignFormatTime">in English, foreign format</h2>
                    <li ng-if="$ctrl.englishForeignFormatTime">
                    {{$ctrl.service.ForeignFormatEnglishTime}}
                    </li>

                    <h2 class="timeConversionHeader" ng-click="$ctrl.UsFormatTranslatedTime=!$ctrl.UsFormatTranslatedTime">Translated times in US format</h2>
                    <li ng-if="$ctrl.UsFormatTranslatedTime" ng-repeat="time in $ctrl.service.UsFormatTranslatedTimeArray">
                        in {{time.languageName}}, {{time.time}}
                    </li>
                    
                    <h2 class="timeConversionHeader" ng-click="$ctrl.foreignFormatTranslatedTime=!$ctrl.foreignFormatTranslatedTime">Translated times in foreign format</h2>
                    <li ng-if="$ctrl.foreignFormatTranslatedTime" ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    in {{time.languageName}}, {{$ctrl.service.countryName}} format: {{time.time}}
                    </li>
                <ul>
            </li>
        </ul>
    </div>`,
    controller: DisplayDataController
});