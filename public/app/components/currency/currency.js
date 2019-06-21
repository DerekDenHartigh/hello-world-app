"use strict";

function CurrencyController(helloWorldService) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.usdCurrencyConverted = false; // hides conversions until function is run
    ctrl.foreignCurrencyConverted = false; // hides conversions until function is run
    ctrl.convertedForeignCurrencyArray = [];
    ctrl.sourceCurrency = ctrl.service.currencyNameDisplayArray[0];
    ctrl.getCurrencyRates = ()=>{
        if(ctrl.service.currencyQueried === true){ // prevent's unneccessary api calls
            return;
        }
        ctrl.service.getCurrencyRates();
    };

    ctrl.convertUsdToForeign = (dollars, targetCurrency)=>{
        ctrl.usdCurrencyConverted = false; // hides conversions until function is run
        ctrl.convertedForeignCurrencyArray = []; // empties array
        let euros = dollars*ctrl.service.EuroToUsdConversionFactor;
        console.log(`euros ${euros}`);

        ctrl.service.languageCodeArray.forEach(languageCode=>{ // makes an array of multiple local currency conversions
            let currencyCode = ctrl.service.convertCurrencyNameToCode(targetCurrency);
            console.log(`currencyCode ${currencyCode}`);
            let eurosToTargetCurrencyConversionFactor = ctrl.service.EuroCurrencyRates[currencyCode];
            console.log(`conversionFactor ${eurosToTargetCurrencyConversionFactor}`);
            let translatedValue = (euros*eurosToTargetCurrencyConversionFactor);
            ctrl.convertedForeignCurrencyArray.push(translatedValue.toLocaleString(`${languageCode}-${ctrl.service.country2LetterCode}`, { style: 'currency', currency: currencyCode })); // adds locally styled converted currency to array for display
            // ctrl.englishCurrencyTranslation = ctrl.translatedValue.toLocaleString('en-US', { style: 'currency', currency: currencyCode }); // I don't think this is really necessary
        });
        ctrl.usdCurrencyConverted = true; // shows conversions
    };

    ctrl.convertForeignToUsd = (money, sourceCurrency)=>{ // 5, Yen
        ctrl.foreignCurrencyConverted = false; // hides conversions until function is run
        let foreignCurrencyCode = ctrl.service.convertCurrencyNameToCode(sourceCurrency); // CNY
        ctrl.usdCurrencyTranslation = (money*(1/ctrl.service.EuroCurrencyRates[foreignCurrencyCode])*ctrl.service.EuroCurrencyRates["USD"]).toLocaleString('en-US', { style: 'currency', currency: "USD" }); // I just did it all in 1 string, convert the money w/ math, then format it english US format
        ctrl.foreignCurrencyConverted = true;
    };

}

angular
.module('HelloWorldApp')  
.component('currency', {
    controller: CurrencyController,
    template: `
    <!--<div ng-if="$ctrl.service.countryQueried">-->
        <!--<button ng-click="$ctrl.getCurrencyRates();">getCurrencyRates</button>-->
    <div id="currencyContainer" class="flex">
        <h1 display="flex">USD to {{ctrl.service.currencyNameDisplayArray[0]}}</h1>
        <div class="conversionContainer">
            <label class="dollarSign">$</label><input class="usdInput" ng-model="$ctrl.userUsdInput" type="number" min="0.00" step="0.01" />
            <div class="conversionButton" ng-click="$ctrl.convertUsdToForeign($ctrl.userUsdInput, $ctrl.targetCurrency)"><i class="material-icons conversionButtonIcon">arrow_forward_ios</i><i class="material-icons conversionButtonIcon">arrow_forward_ios</i><i class="material-icons conversionButtonIcon">arrow_forward_ios</i></div>
            <select ng-model="$ctrl.targetCurrency" ng-options="currency for currency in $ctrl.service.currencyNameDisplayArray"></select>
            <p ng-repeat="currency in $ctrl.convertedForeignCurrencyArray">{{currency}}</p>
        </div>

    <br/><br/>

        <h1 display="flex">{{ctrl.service.currencyNameDisplayArray[0]}} to USD</h1>
        <div class="conversionContainer">
            <input ng-model="$ctrl.foreignMoney" type="number" min="0.00" step="0.01" />
            <button ng-click="$ctrl.convertForeignToUsd($ctrl.foreignMoney, $ctrl.sourceCurrency)"><i class="material-icons">arrow_forward_ios</i></button>
            <p>{{$ctrl.usdCurrencyTranslation}}</p>
        </div>
    </div>
    `
});