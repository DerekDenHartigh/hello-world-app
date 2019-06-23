"use strict";

function CurrencyController(helloWorldService, $scope, $interval) {
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
        if (dollars == null){ // if input is empty, this will clear the display and kill the function before it runs
            ctrl.convertedForeignCurrencyArray = []
            ctrl.usdCurrencyConverted = false;
            // console.log("dollars = null")
            return;
        }
        ctrl.usdCurrencyConverted = false; // hides conversions until function is run
        ctrl.convertedForeignCurrencyArray = []; // empties array
        let euros = dollars*ctrl.service.EuroToUsdConversionFactor;
        // console.log(`euros ${euros}`);

        ctrl.service.languageCodeArray.forEach(languageCode=>{ // makes an array of multiple local currency conversions
            let currencyCode = ctrl.service.convertCurrencyNameToCode(targetCurrency);
            // console.log(`currencyCode ${currencyCode}`);
            let eurosToTargetCurrencyConversionFactor = ctrl.service.EuroCurrencyRates[currencyCode];
            // console.log(`conversionFactor ${eurosToTargetCurrencyConversionFactor}`);
            let translatedValue = (euros*eurosToTargetCurrencyConversionFactor);
            ctrl.convertedForeignCurrencyArray.push(translatedValue.toLocaleString(`${languageCode}-${ctrl.service.country2LetterCode}`, { style: 'currency', currency: currencyCode })); // adds locally styled converted currency to array for display
            // ctrl.englishCurrencyTranslation = ctrl.translatedValue.toLocaleString('en-US', { style: 'currency', currency: currencyCode }); // I don't think this is really necessary
        });
        ctrl.usdCurrencyConverted = true; // shows conversions
    };

    ctrl.convertForeignToUsd = (money, sourceCurrency)=>{ // 5, Yen
        if (money == null){
            ctrl.foreignCurrencyConverted = false;
            ctrl.usdCurrencyTranslation = null;
            // console.log("money null")
            return;
        }
        // console.log(money, sourceCurrency)
        ctrl.foreignCurrencyConverted = false; // hides conversions until function is run
        let foreignCurrencyCode = ctrl.service.convertCurrencyNameToCode(sourceCurrency); // CNY
        // console.log(foreignCurrencyCode);
        ctrl.usdCurrencyTranslation = (money*(1/ctrl.service.EuroCurrencyRates[foreignCurrencyCode])*ctrl.service.EuroCurrencyRates["USD"]).toLocaleString('en-US', { style: 'currency', currency: "USD" }); // I just did it all in 1 string, convert the money w/ math, then format it english US format
        ctrl.foreignCurrencyConverted = true;
    };

    $interval(function() {
        $scope.$watch('ctrl.userUsdInput', function() {
            ctrl.convertUsdToForeign(ctrl.userUsdInput, ctrl.service.currencyNameDisplayArray[0]);
        });

        $scope.$watch('ctrl.foreignMoney', function() {
            ctrl.convertForeignToUsd(ctrl.foreignMoney, ctrl.service.currencyNameDisplayArray[0]);
        });
    }, 200);


    /** testing */
    // ctrl.service.currencyNameDisplayArray = ["China Yuan/Renminbi", "Australia Dollar", "Great Britain Pound"];
    // ctrl.service.languageCodeArray = ["zh"];
    // ctrl.service.country2LetterCode = "CN";
    // ctrl.service.currencyCodeArray = ["CNY", "AUD", "GBP"];

}

angular
.module('HelloWorldApp')  
.component('currency', {
    controller: CurrencyController,
    template: `
    <div ng-if="$ctrl.service.countryQueried">
        <h1 display="flex">From USD to {{$ctrl.service.currencyNameDisplayArray[0]}}</h1>
        <div class="conversionContainer">
            <input class="currencyInput" ng-model="$ctrl.userUsdInput" type="number" min="0.00" step="0.01" />
            <div class="conversionButton"><i class="material-icons conversionButtonIcon">arrow_forward_ios</i></div>
            <div class="convertedCurrencyDisplayContainer">
                <p ng-repeat="currency in $ctrl.convertedForeignCurrencyArray">{{currency}}</p>
            </div>
        </div>

        <h1 display="flex">From {{$ctrl.service.currencyNameDisplayArray[0]}} to USD</h1>
        <div class="conversionContainer">
            <input class="currencyInput" ng-model="$ctrl.foreignMoney" type="number" min="0.00" step="0.01" />
            <div class="conversionButton"><i class="material-icons conversionButtonIcon">arrow_forward_ios</i></div>
            <div class="convertedCurrencyDisplayContainer">
                <p id="translatedCurrencyDisplay" ng-if="$ctrl.foreignCurrencyConverted">{{$ctrl.usdCurrencyTranslation}}</p>
            </div>
        </div>
    </div>
    `
});

/**
 * I think I'll simplify the layout and just select the top currency, not many countries have 2 official currencies, and those that do usally have the USD as their second
 * <!--<div ng-if="$ctrl.service.countryQueried">-->
    <div id="currencyContainer" class="flex">
        <h1 display="flex">From USD to <select class="currencyInput" ng-model="$ctrl.targetCurrency" ng-options="currency for currency in $ctrl.service.currencyNameDisplayArray" value="$ctrl.service.currencyNameDisplayArray[0]"></select></h1>
        <div class="conversionContainer">
            <label class="dollarSign">$</label><input class="currencyInput" ng-model="$ctrl.userUsdInput" type="number" min="0.00" step="0.01" />
            <div class="conversionButton" ng-click="$ctrl.convertUsdToForeign($ctrl.userUsdInput, $ctrl.targetCurrency)"><i class="material-icons conversionButtonIcon">arrow_forward_ios</i></div>
            <div class="convertedCurrencyDisplayContainer">
                <p ng-repeat="currency in $ctrl.convertedForeignCurrencyArray">{{currency}}</p>
            </div>
        </div>

    <br/><br/>

        <h1 display="flex">From <select class="currencyInput" ng-model="$ctrl.sourceCurrency" ng-options="currency for currency in $ctrl.service.currencyNameDisplayArray" value="$ctrl.service.currencyNameDisplayArray[0]"></select> to USD</h1>
        <div class="conversionContainer">
            <input class="currencyInput" ng-model="$ctrl.foreignMoney" type="number" min="0.00" step="0.01" />
            <div class="conversionButton" ng-click="$ctrl.convertForeignToUsd($ctrl.foreignMoney, $ctrl.sourceCurrency)"><i class="material-icons conversionButtonIcon">arrow_forward_ios</i></div>
            <div class="convertedCurrencyDisplayContainer">
                <p id="translatedCurrencyDisplay" ng-if="$ctrl.foreignCurrencyConverted">{{$ctrl.usdCurrencyTranslation}}</p>
            </div>
        </div>
    </div>

    .dollarSign{
    position: relative;
    left: 10px;
    color: var(--dark-green)
}
 */