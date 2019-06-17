"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.countryQueried = false; // has a country been queried?
    service.translated = false; // has a translation been done?
    service.userTranslation = ""; // eventually becomes translated user text
    service.languageList = "" // displayable list of languages
    service.currencyList = "" // displayable list of currencies // still needs to be done
    service.languageCodeArray = [];  // hardcoded 4 testing will need to delete before production
    service.languageNameArray = []; // hardcoded 4 testing will need to delete before production
    service.currencyArray = []; // gets set by country search
    service.phrases = [ // not sure how the spaces will be handled by watson.
        {
            foreign: "",
            english: 'Hello'
        },
        {
            foreign: "",
            english: 'Goodbye'
        },
        // {
        //     foreign: "",
        //     english: 'I would like    .'
        // },
        // {
        //     foreign: "",
        //     english: 'Where is   ?'
        // },
        // {
        //     foreign: "",
        //     english: 'How do you say    ?'
        // },
        // {
        //     foreign: "",
        //     english: 'How much is this?'
        // },
        // {
        //     foreign: "",
        //     english: 'What is your name? My name is     .'
        // },
        // {
        //     foreign: "",
        //     english: 'Where is the bathroom?'
        // }
        ];

    service.getPhraseTranslation = (englishPhrase, targetLanguage) => {
        return $http({
            url: "/translatephrase",
            data:{
                text: englishPhrase,
                source: 'en',  // should we give more options here?
                target: service.convertLanguageNameToCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            console.log(translation);
            let translatedPhrase = translation.data.translations[0].translation;
            return translatedPhrase;
        })
        .catch(err => {
        console.log('error:', err);
        alert("Something went wrong with the translation API, check the console log.");
        });
    };

    service.translatePhrases = (targetLanguage)=>{
        service.phrases.forEach(function(phrase) {
            service.getPhraseTranslation(phrase.english, targetLanguage)
                .then((phraseTranslation)=>{
                    phrase.foreign = phraseTranslation;
                    return phrase;
                })
                .catch((err)=>{
                    console.error(err);
                })
        });
    };

    service.convertRawArraysToList = ()=>{
        service.languageList = service.languageNameArray.join(", ");
        service.currencyList = service.currencyArray.join(", ");
// for testing below here, be sure to delete it:
        // service.languageList = service.languageCodeArray.join(", "); // this array will later be used to make languageNameArray
        // bug, when I search taiwan, it set the languageList as zh(chinese), though the display was still spanish, when I translated things, it was translating in spanish, though the only option was spanish
    };

    service.getCountry = (countryName)=>{
        console.log("getting data");
        return $http({ 
            url:`https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
            headers : {
              "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
              "X-RapidAPI-Key": "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33"
            },
            method: "GET",
        })
        .then((response) => {
            service.countryData = response.data[0];
            service.currencyArray = service.countryData.currencies;
            service.languageCodeArray = service.countryData.languages;
            //service.languageNameArray = service.languageCodeArray.map(service.langCodeTranslate())
            service.languageCodeArray.forEach(languageCodeGettingTranslated => {
                service.langCodeTranslate(languageCodeGettingTranslated);
              });
            console.log(service.languageCodeArray);
            console.log(service.languageNameArray);
            service.convertRawArraysToList();
            service.countryQueried = true; // toggles the displayData ng-ifs
            console.log(response);
            return response;
        })
        .catch((error) => { 
            console.error(error);
        })
    };

    service.convertLanguageNameToCode = (targetLanguage)=>{
        let index = service.languageNameArray.indexOf(targetLanguage); // since languageNameArray is not yet being created by the getCountry function, this will still select the 0th index of other languages, its a hardcoded feature, not a bug.
        let languageCode = service.languageCodeArray[index];
        console.log(`index: ${index}, languageCode: ${languageCode}`);
        return languageCode;
    };
    
    service.getTranslation = (preTranslatedText, targetLanguage) => {
        console.log(`targetLanguage: ${targetLanguage}`)
        return $http({
            url: "/translate",
            data:{
                text: preTranslatedText,
                source: 'en',  // should we give more options here?
                target: service.convertLanguageNameToCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            console.log(translation);
            service.userTranslation = translation.data.translations[0].translation;
            service.translated = true;
        })
        .catch(err => {
        console.log('error:', err);
        alert("Something went wrong with the translation API, check the console log.");
        });
    };

/**
 * Watson Recognized Languages:
 * 
Arabic
Czech
Danish
Dutch
Finnish
French
German
Greek
Hebrew
Hindi
Hungarian
Italian
Japanese
Korean
Norwegian Bokmal
Polish
Portuguese
Russian
Simplified Chinese
Spanish
Swedish
Traditional Chinese
Turkish
 */

service.langCodeTranslate = (languageCodeGettingTranslated)=>{
    switch(languageCodeGettingTranslated){
        case "ar": service.languageNameArray.push("Arabic");break;
        case "cs": service.languageNameArray.push("Czech");break;
        case "da": service.languageNameArray.push("Danish");break;
        case "nl": service.languageNameArray.push("Dutch, Flemish");break;
        case "fi": service.languageNameArray.push("Finnish");break;
        case "fr": service.languageNameArray.push("French");break;
        case "de": service.languageNameArray.push("German");break;
        case "el": service.languageNameArray.push("Greek, Modern");break; 
        case "he": service.languageNameArray.push("Hebrew");break;
        case "hi": service.languageNameArray.push("Hindi");break;
        case "hu": service.languageNameArray.push("Hungarian");break;
        case "it": service.languageNameArray.push("Italian");break;
        case "ja": service.languageNameArray.push("Japanese");break;
        case "ko": service.languageNameArray.push("Korean");break;
        case "nb": service.languageNameArray.push("Norwegian Bokmål");break;
        // case "nn": service.languageNameArray.push("Norwegian Nynorsk");break;
        // case "no": service.languageNameArray.push("Norwegian");break;
        case "pl": service.languageNameArray.push("Polish");break;
        case "pt": service.languageNameArray.push("Portuguese");break;
        case "ru": service.languageNameArray.push("Russian");break;
        case "zh": service.languageNameArray.push("Chinese");break;
        case "es": service.languageNameArray.push("Spanish, Castilian");break;
        case "sv": service.languageNameArray.push("Swedish");break;
        case "tr": service.languageNameArray.push("Turkish");break;
        default: alert("Sorry, that language is not supported."); break;
    };
};

});
