function DisplayDataController (helloWorldService ) {
    const ctrl = this
    ctrl.service = helloWorldService;
    

    // ctrl.service.displayCurrencies =  ctrl.service.countryData.currencies.join(",");
    
}



angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `
    <div class = "displayContainer" ng-if="true">
    <p>This is where the country data goes</p>
    <h3>{{$ctrl.countryData.name}}</h3>
    <ul>
    <li>Capital: {{$ctrl.service.countryData.capital}}</li>
    <li>Language(s): {{$ctrl.service.countryData.languages}}</li>
    <li>Currencies: {{$ctrl.service.displayCurrencies}} </li>
    <li>Population: {{$ctrl.service.countryData.population}} </li>
    </ul>
    </div>`,
    controller: DisplayDataController
});

