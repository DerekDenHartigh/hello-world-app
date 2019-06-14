function DisplayDataController (helloWorldService ) {
    const ctrl = this
    ctrl.service = helloWorldService;
    

    // ctrl.service.displayCurrencies =  ctrl.service.countryData.currencies.join(",");
    
}



angular
.module('HelloWorldApp')  
.component('displayData', {
    template: `<div class = "display-data" ng-if="true">
    <h3>{{$ctrl.countryData.name}}</h3>
    <ul>
    <li>{{$ctrl.service.countryData.capital}}</li>
    <li>{{$ctrl.service.countryData.languages}}</li>
    <li>{{$ctrl.service.countryData.currencies}} </li>
    <li>{{$ctrl.countryData.population}} </li>
    </ul>
    </div>`,
    controller: DisplayDataController
});

