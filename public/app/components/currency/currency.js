"use strict";

function CurrencyController(helloWorldService) {
    const ctrl = this
    ctrl.service = helloWorldService;
    ctrl.usdCurrencyConverted = false; // hides conversions until function is run
    ctrl.foreignCurrencyConverted = false; // hides conversions until function is run
    ctrl.convertedForeignCurrencyArray = [];
    ctrl.getCurrencyRates = ()=>{
        if(ctrl.service.currencyQueried === true){ // prevent's unneccessary api calls
            return;
        }
        ctrl.service.getCurrencyRates();
    };

    ctrl.convertUsdToForeign = (dollars, targetCurrency)=>{
        ctrl.usdCurrencyConverted = false; // hides conversions until function is run
        ctrl.convertedForeignCurrencyArray = [];
        let currencyCode = ctrl.service.convertCurrencyNameToCode(targetCurrency);
        console.log(`currencyCode ${currencyCode}`);
        let euros = dollars*ctrl.service.EuroToUsdConversionFactor;
        console.log(`euros ${euros}`);
        let eurosToTargetCurrencyConversionFactor = ctrl.service.EuroCurrencyRates[currencyCode];
        console.log(`conversionFactor ${eurosToTargetCurrencyConversionFactor}`);
        ctrl.translatedValue = (euros*eurosToTargetCurrencyConversionFactor);

        ctrl.englishCurrencyTranslation = ctrl.translatedValue.toLocaleString('en-US', { style: 'currency', currency: currencyCode });
        ctrl.service.languageCodeArray.forEach(languageCode=>{ // makes an array of multiple local currency conversions
            ctrl.convertedForeignCurrencyArray.push(ctrl.translatedValue.toLocaleString(`${languageCode}-${ctrl.service.country2LetterCode}`, { style: 'currency', currency: currencyCode })); // adds locally styled converted currency to array for display
        });
        ctrl.usdCurrencyConverted = true;
    };

    ctrl.convertForeignToUsd = (money, sourceCurrency)=>{
        ctrl.foreignCurrencyConverted = false; // hides conversions until function is run
        // let currencyCode = ctrl.service.convertCurrencyNameToCode(sourceCurrency);
        // console.log(`currencyCode ${currencyCode}`);
        // let euros = dollars*ctrl.service.EuroToUsdConversionFactor;
        // console.log(`euros ${euros}`);
        // let eurosToTargetCurrencyConversionFactor = ctrl.service.EuroCurrencyRates[currencyCode];
        // console.log(`conversionFactor ${eurosToTargetCurrencyConversionFactor}`);
        // ctrl.translatedValue = (euros*eurosToTargetCurrencyConversionFactor);
        // ctrl.englishCurrencyTranslation = ctrl.translatedValue.toLocaleString('en-US', { style: 'currency', currency: currencyCode });
        // ctrl.service.languageCodeArray.forEach(languageCode=>{ // makes an array of multiple local currency conversions
        //     convertedForeignCurrencyArray.push(ctrl.translatedValue.toLocaleString(`${languageCode}-${ctrl.service.country2LetterCode}`, { style: 'currency', currency: currencyCode })); // adds locally styled converted currency to array for display
        // });
        ctrl.foreignCurrencyConverted = true;
    };
    }

}

angular
.module('HelloWorldApp')  
.component('currency', {
    controller: CurrencyController,
    template: `
    <button ng-click="$ctrl.getCurrencyRates();">getCurrencyRates</button>

    <h1>USD to foreign currency conversions:</h1>
    <div>
        <label>$<input ng-model="$ctrl.userUsdInput" type="number" min="0.00" step="0.01" /></label>
        <label>to <select ng-model="$ctrl.targetCurrency" ng-options="currency for currency in $ctrl.service.currencyNameDisplayArray"></select>
    </div>
        <button ng-click="$ctrl.convertUsdToForeign($ctrl.userUsdInput, $ctrl.targetCurrency)">Convert USD to {{$ctrl.targetCurrency}}</button>
    <p ng-if="$ctrl.usdCurrencyConverted">In english, US format {{$ctrl.englishCurrencyTranslation}}</p>
    <p ng-repeat="currency in $ctrl.convertedForeignCurrencyArray">{{currency}}</p>

    <br><br>

    <h1>Foreign currency to USD conversions:</h1>
    <input ng-model="$ctrl.foreignMoney" type="number" min="0.00" step="0.01" />
    <select ng-model="$ctrl.sourceCurrency" ng-options="currency for currency in $ctrl.service.currencyNameDisplayArray"></select>
    <button ng-click="$ctrl.service.usdToTargetCurrency($ctrl.userUsdInput, $ctrl.sourceCurrency)">Convert USD to {{$ctrl.sourceCurrency}}</button>
    <p ng-if="$ctrl.usdCurrencyConverted">In english, US format {{$ctrl.englishCurrencyTranslation}}</p>
    <p ng-repeat="currency in $ctrl.convertedForeignCurrencyArray">{{currency}}</p>
    `
});