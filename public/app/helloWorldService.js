"use strict";

// let ApiInfo = require("../../secret.js");
// console.log(config);
// let RestCountriesApiInfo = ApiInfo.RestCountriesApiInfo;
// let IbmApiInfo = ApiInfo.IbmApiInfo;

angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;

    service.getCountry = (countryName)=>{
        console.log("getting data");

        return $http({ 
            url:`https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
            headers : {
              "X-RapidAPI-Host": RestCountriesApiInfo.host,
              "X-RapidAPI-Key": RestCountriesApiInfo.key
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

});