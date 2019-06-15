"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.translated = false;
    service.userTranslation = "";

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