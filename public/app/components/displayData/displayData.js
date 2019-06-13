function DisplayData () {
    const ctrl = this
    ctrl.service = helloWorldService 
}



angular
.module('HelloWorldApp')  
.component('countryInfo', {
    template: `<div class = "country-info">
    <h3>{{$ctrl.countryData.name}}</h3>
    <ul>
    <li>{{$ctrl.service.countryData.capital}}</li>
    <li>{{$ctrl.service.countryData.languages}}</li>
    <li>{{$ctrl.service.countryData.currencies}} </li>
    <li>{{$ctrl.countryData.population}} </li>
    </ul>
    </div>`,
    controller: CountryInfoController
});