function DisplayDataController (helloWorldService ) {
    const ctrl = this
    ctrl.service = helloWorldService;    
}

angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class = "displayContainer" ng-if="$ctrl.service.countryQueried">
    <p>This is where the country data goes</p>
    <h3>{{$ctrl.countryData.name}}</h3>
        <ul>
            <li>Capital: {{$ctrl.service.countryData.capital}}</li>
            <li>Language(s): {{$ctrl.service.languageList}}</li>
            <li>Currencies: {{$ctrl.service.currencyList}} </li>
            <li>Population: {{$ctrl.service.countryData.population}} </li>
        </ul>
    </div>`,
    controller: DisplayDataController
});

