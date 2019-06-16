"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.countryQueried = false;
    service.translated = false;
    service.userTranslation = "";
    service.languageList = ""
    service.currencyList = ""
    service.languageCodeArray = ["es"];
    service.languageNameArray = ["spanish"];
    service.currencyArray = [];
    service.phrases = [
        {
            foreign: "stuff",
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
            // url: "https://gateway-wdc.watsonplatform.net/language-translator/api",
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
        // console.log("service.phrases and targetLanguage");
        // console.log(service.phrases, targetLanguage);
        service.phrases.forEach(function(phrase) {
            // console.warn(phrase);
            service.getPhraseTranslation(phrase.english, targetLanguage)
                .then((phraseTranslation)=>{
                    phrase.foreign = phraseTranslation;
                    return phrase;
                })
            // console.error(phrase.english, phrase.foreign);
            
        });
    };

    service.convertRawArraysToList = ()=>{
        service.languageList = service.languageNameArray.join(", ");
        service.currencyList = service.currencyArray.join(", ");
// for testing below here, be sure to delete it:
        service.languageList = service.languageCodeArray.join(", "); // this array will later be used to make languageNameArray
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
        let index = service.languageNameArray.indexOf(targetLanguage);
        let languageCode = service.languageCodeArray[index];
        return languageCode;
    };
    
    service.getTranslation = (preTranslatedText, targetLanguage) => {
        return $http({
            // url: "https://gateway-wdc.watsonplatform.net/language-translator/api",
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
});