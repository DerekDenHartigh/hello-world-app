"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.translated = false;
    service.userTranslation = "";
    service.languageList = ""
    service.currencyList = ""
    service.languageCodeArray = [];
    service.languageNameArray = ["Applesauce", "bananish", "martian"];
    service.currencyArray = [];

    service.convertRawArraysToList = ()=>{
        service.languageList = service.languageNameArray.join(", ");
        service.currencyList = service.currencyArray.join(", ");
// for testing below here, be sure to delete it:
        service.languageList = service.languageCodeArray.join(", "); // this array will later be used to make languageNameArray
}

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
            console.log(response);
            return response;
        })
        .catch((error) => { 
            console.error(error);
        })
    };

      service.getTranslation = (preTranslatedText, targetLanguage) => {
          return $http({
              // url: "https://gateway-wdc.watsonplatform.net/language-translator/api",
              url: "/translate",
              data:{
                  text: preTranslatedText,
                  source: 'en',
                  target: targetLanguage
              },
              method: 'POST'
          })
          .then(translation => {
              console.log(translation);
              // console.log(JSON.stringify(translation, null, 2));
              service.userTranslation = translation.data.translations[0].translation;
              service.translated = true;
          })
          .catch(err => {
            console.log('error:', err);
            alert("Something went wrong with the translation API, check the console log.");
          });

          
    };
});