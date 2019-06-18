function DisplayDataController (helloWorldService ) {
    const ctrl = this
    ctrl.service = helloWorldService;    
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
                    <li>
                    in English, US format: {{$ctrl.service.timeInEnglishUsFormat}}
                    </li>

                    <li ng-repeat="time in $ctrl.service.UsFormatTranslatedTimeArray">
                    in {{$ctrl.service.convertLanguageCodeToName(languageCode)}}, US format: {{time}}
                    </li>
                    
                    <li ng-repeat="time in $ctrl.service.ForeignFormatTranslatedTimeArray">
                    in {{$ctrl.service.convertLanguageCodeToName(languageCode)}}, {{$ctrl.service.country2LetterCode}} format: {{time}}
                    </li>
                    
                <ul>
            </li>
        </ul>
    </div>`,
    controller: DisplayDataController
});