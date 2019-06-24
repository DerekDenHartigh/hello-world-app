"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http){
    const service = this;

    /////**********Variable initialization**********//////

    service.currencyQueried = false;
    service.countrySearched = false; // using this for redirect, since country queried can take > 1 second to switch to true.
    service.countryData;
    service.countryName;
    service.country2LetterCode;
    service.timezoneArray = [];
    service.countryQueried = false; // has a country been queried?
    service.translated = false; // has a translation been done?
    service.userTranslation = ""; // eventually becomes translated user text
    service.languageDisplayList = "" // displayable list of languages
    service.currencyList = "" // displayable list of currencies // still needs to be done
    service.languageCodeArray = [];  // hardcoded 4 testing will need to delete before production
    service.languageNameTranslationArray = []; // hardcoded 4 testing will need to delete before production
    service.languageNameDisplayArray = [];
    service.currencyCodeArray = []; // gets set by country search
    service.currencyNameDisplayArray = [];


    service.EuroToUsdConversionFactor = 1/1.139556;
    // these currency rates are from 6/22/19, I may keep them as an offline backup in case our api goes down or user is offline and cannot GET the current rates
    service.EuroCurrencyRates = { 
        AED: 4.185821,AFN: 91.921167,ALL: 122.337048,AMD: 542.417571,ANG: 2.131428,AOA: 387.75894,ARS: 48.643121,AUD: 1.643928,AWG: 2.05234,AZN: 1.942989,BAM: 1.965781,BBD: 2.263613,BDT: 96.040661,BGN: 1.960155,BHD: 0.429533,BIF: 2087.666019,BMD: 1.139556,BND: 1.539203,BOB: 7.870627,BRL: 4.355429,BSD: 1.136422,BTC: 0.000115,BTN: 79.375214,BWP: 12.155687,BYN: 2.317747,BYR: 22335.29147,BZD: 2.290854,CAD: 1.508943,CDF: 1892.802409,CHF: 1.111209,CLF: 0.028236,CLP: 779.108572,CNY: 7.828638,COP: 3631.536064,CRC: 664.737469,CUC: 1.139556,CUP: 30.198226,CVE: 111.45026,CZK: 25.666331,DJF: 202.522285,DKK: 7.484379,DOP: 58.020524,DZD: 135.441937,EGP: 18.979346,ERN: 17.093743,ETB: 32.795848,EUR: 1,FJD: 2.455788,FKP: 0.899947,GBP: 0.894329,GEL: 3.157015,GGP: 0.895041,GHS: 6.137363,GIP: 0.899947,GMD: 56.526353,GNF: 10413.431247,GTQ: 8.757087,GYD: 237.312915,HKD: 8.905001,HNL: 28.265358,HRK: 7.419693,HTG: 106.05889,HUF: 324.739626,IDR: 16096.224082,ILS: 4.127186,IMP: 0.895041,INR: 79.290725,IQD: 1356.071268,IRR: 47980.992613,ISK: 141.863727,JEP: 0.895041,JMD: 147.276616,JOD: 0.80799,JPY: 122.291464,KES: 116.109767,KGS: 79.363791,KHR: 4646.542644,KMF: 495.422273,KPW: 1025.635983,KRW: 1320.939203,KWD: 0.345992,KYD: 0.947147,KZT: 430.415926,LAK: 9868.552649,LBP: 1722.100861,LKR: 201.34853,LRD: 222.213756,LSL: 16.330268,LTL: 3.364812,LVL: 0.689306,LYD: 1.583584,MAD: 10.84037,MDL: 20.714278,MGA: 4154.026629,MKD: 62.151941,MMK: 1727.000921,MNT: 3016.973682,MOP: 9.145167,MRO: 406.821774,MUR: 40.773734,MVR: 17.667376,MWK: 866.136438,MXN: 21.793437,MYR: 4.714386,MZN: 70.624008,NAD: 16.330263,NGN: 410.240439,NIO: 37.462937,NOK: 9.683493,NPR: 126.513901,NZD: 1.72875,OMR: 0.43865,PAB: 1.136707,PEN: 3.765136,PGK: 3.848854,PHP: 58.619172,PKR: 179.070208,PLN: 4.266045,PYG: 7085.875434,QAR: 4.149166,RON: 4.739456,RSD: 118.126768,RUB: 71.82662,RWF: 1035.400297,SAR: 4.273224,SBD: 9.391934,SCR: 15.564095,SDG: 51.270324,SEK: 10.656901,SGD: 1.54433,SHP: 1.505244,SLL: 10142.046002,SOS: 660.942684,SRD: 8.49885,STD: 23988.330505,SVC: 9.945021,SYP: 586.871564,SZL: 16.283685,THB: 35.001496,TJS: 10.717693,TMT: 3.988445,TND: 3.33913,TOP: 2.609868,TRY: 6.633814,TTD: 7.697528,TWD: 35.278939,TZS: 2621.210134,UAH: 29.788404,UGX: 4188.213155,USD: 1.139556,UYU: 40.15836,UZS: 9709.014836,VEF: 11.381317,VND: 26471.080926,VUV: 131.083089,WST: 3.056745,XAF: 659.267568,XAG: 0.074279,XAU: 0.000815,XCD: 3.079707,XDR: 0.821414,XOF: 659.267567,XPF: 119.858882,YER: 285.288181,ZAR: 16.333598,ZMK: 10257.372746,ZMW: 14.690055,ZWL: 367.341486}


    service.phrases = [ // not sure how the spaces will be handled by watson.
        {
            foreign: "",
            english: 'I need help!',
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'There is an emergency!',
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'I am hurt.',
            category: 'emergency'
        },
        {
            foreign: "",
            english: "I've been poisoned.",
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'Where is the American Embassy?',
            category: 'emergency'
        }, 
        {
            foreign: "",
            english: 'I need a doctor.',
            category: 'emergency'
        }, 
        {
            foreign: "",
            english: 'Call an ambulance.',
            category: 'emergency'
        }, 
        {
            foreign: "",
            english: 'Call the police.',
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'Where is the pharmacy?',
            category: 'emergency'
        }, 
        {
            foreign: "",
            english: 'Stop, thief!',
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'Fire!',
            category: 'emergency'
        },{
            foreign: "",
            english: 'Go away!',
            category: 'emergency'
        },
        {
            foreign: "",
            english: 'Take me to...',
            category: 'transit'
        },  
        {
            foreign: "",
            english: 'Go straight.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'Turn right.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'Turn left.',
            category: 'transit'
        },
        {
            foreign: "",
            english: 'Turn around.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'To the airport.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'To the train station.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'To the bus station.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'I need a ticket.',
            category: 'transit'
        },
        {
            foreign: "",
            english: 'What time will we arrive?',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: 'Where are we?',
            category: 'transit'
        },
        {
            foreign: "",
            english: 'I am lost.',
            category: 'transit'
        }, 
        {
            foreign: "",
            english: "I'm Hungry.",
            category: 'dining'
        }, 
        {
            foreign: "",
            english: 'May I see the menu, please.',
            category: 'dining'
        },
        {
            foreign: "",
            english: 'I am ready to order.',
            category: 'dining'
        }, 
        {
            foreign: "",
            english: "I'll have the...",
            category: 'dining'
        },
        {
            foreign: "",
            english: 'I would like a drink please.',
            category: 'dining'
        }, 
        {
            foreign: "",
            english: 'Bottled water, please.',
            category: 'dining'
        },
        {
            foreign: "",
            english: 'What do you recomment?',
            category: 'dining'
        },
        {
            foreign: "",
            english: 'What are the ingredients?',
            category: 'dining'
        },
        {
            foreign: "",
            english: 'I am allergic to...',
            category: 'dining'
        },
        {
            foreign: "",
            english: "I don't eat...",
            category: 'dining'
        },
        {
            foreign: "",
            english: 'Check, please!',
            category: 'dining'
        }, 
        {
            foreign: "",
            english: 'Thank you, that was delicious!',
            category: 'dining'
        },
        {
            foreign: "",
            english: 'Where is the front desk?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'I have a reservation.',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'Do you have any rooms available?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'What is my room number?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'I lost my key.',
            category: 'lodging'
        }, {
            foreign: "",
            english: 'Does anyone speak English?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'What time is checkout?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'I would like to checkout.',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'I need more towels.',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'May I extend my stay?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'I need a taxi to the airport.',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'Do you have a map?',
            category: 'lodging'
        }, 
        {
            foreign: "",
            english: 'Hello',
            category: 'general'
        },
        {
            foreign: "",
            english: 'Goodbye',
            category: 'general'
        }, 
        {
            foreign: "",
            english: 'Do you speak English?',
            category: 'general'
        },
        {
            foreign: "",
            english: 'What is your name?',
            category: 'general'
        },
        {
            foreign: "",
            english: 'My name is..',
            category: 'general'
        },
        {
            foreign: "",
            english: 'Excuse me.',
            category: 'general'
        }, 
        {
            foreign: "",
            english: 'Yes, thank you.',
            category: 'general'
        },
        {
            foreign: "",
            english: 'No, thank you.',
            category: 'general'
        },
        {
            foreign: "",
            english: "I'm sorry",
            category: 'general'
        },
        {
            foreign: "",
            english: "I don't understand.",
            category: 'general'
        },
        {
            foreign: "",
            english: 'What time is it?',
            category: 'general'
        },
        {
            foreign: "",
            english: 'Where is the bathroom?',
            category: 'general'
        },

        ];
       
        

    /////**********Variable reset/manipulation functions**********//////

    service.resetAllCountryParams = ()=>{
        service.translated = false; // hides translations
        service.userTranslation = "";
        service.languageCodeArray = [];  
        service.languageNameTranslationArray = [];
        service.languageNameDisplayArray = [];
        service.currencyCodeArray = [];
        service.currencyNameDisplayArray = [];
        service.countryData = null;
        service.country2LetterCode = "";
        service.languageDisplayList = "";
        service.currencyDisplayList = "";
        service.timezoneArray = [];
        service.UsFormatTranslatedTimeArray = [];  
        service.ForeignFormatTranslatedTimeArray = [];
        service.showTranslatedPhrases = false;

        // won't need to reset phrases since service.translated = false will hide them until they are re-translated
    };

    service.resetAllCountryParams();

    service.convertRawArraysToList = ()=>{
        service.languageDisplayList = service.languageNameDisplayArray.join(", ");
        service.currencyDisplayList = service.currencyNameDisplayArray.join(", ");
    };

    /////**********Date & Time Functions**********//////
    service.generateUsFormatEnglishTime = ()=>{
        service.UsFormatEnglishTime = service.today.toLocaleString('en-US');
    }

    service.generateForeignFormatTranslatedTimes = ()=>{
        service.ForeignFormatTranslatedTimeArray = [];
            service.languageCodeArray.forEach(languageCode=>{
                service.ForeignFormatTranslatedTimeArray.push({
                    languageName : service.convertLanguageCodeToName(languageCode),
                    time : service.today.toLocaleString(`${languageCode}-${service.country2LetterCode}`)
                }); // pushes object w/ languageName & formatted time onto array
            });
    };

    service.getTimeAndDate = ()=>{
        service.today = new Date();
        service.generateUsFormatEnglishTime();
        service.generateForeignFormatTranslatedTimes();
    };

    /////**********Translation functions**********//////

    service.getPhraseTranslation = (englishPhrase, targetLanguage) => {
        return $http({
            url: "/translate",
            data:{
                text: englishPhrase,
                source: 'en',  // should we give more options here?
                target: service.languageNametoCode(targetLanguage)
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
        });
    };

    //Translate phrases array for seach tab
    service.translatePhrases = (targetLanguage)=>{
        service.phrases.forEach(function(phrase) {
            service.getPhraseTranslation(phrase.english, targetLanguage)
                .then((phraseTranslation)=>{
                    phrase.foreign = phraseTranslation;
                    phrase.language = targetLanguage; // adds target language to phrase obj
                    return phrase;
                })
                .catch((err)=>{
                    console.error(err);
                })
        });
        service.showTranslatedPhrases = true;
    };

    service.removePhrase = (phrase)=>{
        let index = service.phrases.indexOf(phrase);
        service.phrases.splice(index, 1);
    };
   

    service.getTranslation = (preTranslatedText, targetLanguage) => {
        // console.log(service.languageNametoCode(targetLanguage));
        return $http({
            url: "/translate",
            data:{
                text: preTranslatedText,
                source: 'en',  // should we give more options here?
                target: service.languageNametoCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            // console.log('HIT!');
            service.userTranslation = translation.data.translations[0].translation;
            let newPhrase = {
                foreign : service.userTranslation,
                english : preTranslatedText,
                language : targetLanguage, // adds target language to phrase obj
                category : 'custom' // categorizes phrase 4 display
            }
            console.log(newPhrase);
            service.phrases.push(newPhrase);
            // service.phrases = true;
        })
        .catch(err => {
        console.log('error:', err);
        });
    };

    /////**********Country Query functions**********//////

    service.getCountry = (countryName)=>{
        service.countrySearched = true;
        service.resetAllCountryParams();
        return $http({ 
            url:`https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
            headers : {
              "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
              "X-RapidAPI-Key": "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33"
            },
            method: "GET",
        })
        .then((response) => {
            console.log(response.data);
            service.countryData = response.data[0];
            service.countryName = service.countryData.name;
            service.country2LetterCode = service.countryData.alpha2Code;
            service.ForeignFormatEnglishTime = service.today.toLocaleString(`en-${service.country2LetterCode}`);

            service.currencyCodeArray = service.countryData.currencies;
            service.currencyCodeArray.forEach(currencyCode => {
                service.generateCurrencyNameDisplayArray(currencyCode);
                });

            service.languageCodeArray = service.countryData.languages;
            service.languageCodeArray.forEach(languageCode => {
                service.generateLanguageNameTranslationArray(languageCode);
                service.generateLanguageNameDisplayArray(languageCode);
              });

            // service.generateUsFormatTranslatedTimes(); // makes the function named array
            service.generateForeignFormatTranslatedTimes(); // makes the function named array

            service.convertRawArraysToList();
            
            service.countryQueried = true; // toggles the displayData ng-ifs
            return response;
        })
        .catch((error) => { 
            service.countrySearched = false; // redirects back to search
            console.error(error);
        })
    };

    /////**********Currency Translator**********//////

    service.getCurrencyRates = (countryName)=>{
        return $http({
            url: 'http://data.fixer.io/api/latest?access_key=110ff6f7243102e682786013fdcb1620', 
            dataType: 'jsonp',
            method: 'GET',
        })
        .then((currencyData)=>{
            service.EuroToUsdConversionFactor = (1/currencyData.data.rates.USD); // would currencyData.rates.USD**(-1) be good here?  anyway I need this because free version only comes with euro as base currency
            console.log(currencyData);
            console.log(`service.EuroToUsdConversionFactor ${service.EuroToUsdConversionFactor}`);  // ~.89
            service.EuroCurrencyRates = currencyData.data.rates;
            console.log(`service.EuroCurrencyRates ${service.EuroCurrencyRates}`); // large obj of all the rates compared to Euro
            service.currencyQueried = true; // will be used to prevent unneccesary API calls, 1000x limit, defaults to false on page refresh.
        })
        .catch((err)=>{
            console.error(err);
        })
    };

    /////**********Super Bulky Switch Functions**********//////

service.languageNametoCode = (languageName)=>{
    // refactoring to use an object - much more simplified than switch statement.
    let languageNameArray = 
        { "Arabic": "ar",
         "Czech":  "cs",
         "Danish": "da",
         "Dutch, Flemish": "nl",
         "Finnish": "fi",
         "French": "fr",
         "German": "de",
         "Greek, Modern": "el",
         "Hebrew": "he",
         "Hindi": "hi",
         "Hungarian": "hu",
         "Italian": "it",
         "Japanese": "ja",
         "Korean": "ko",
         "Norwegian Bokmål": "nb",
         "Polish": "pl",
         "Portuguese": "pt",
         "Russian": "ru",
         "Chinese": "zh",
         "Spanish, Castilian": "es",
         "Swedish": "sv",
         "Turkish": "tr"};

    // e.g. languageNameArray["Turkish"] returns "tr"
    return languageNameArray[languageName];
}

service.convertLanguageCodeToName = (languageCode)=>{
    let languageCodeObject = {
         "ab":  "Abkhazian",
         "aa":  "Afar",
         "af":  "Afrikaans",
         "ak":  "Akan",
         "sq":  "Albanian",
         "am":  "Amharic",
         "ar":  "Arabic",
         "an":  "Aragonese",
         "hy":  "Armenian",
         "as":  "Assamese",
         "av":  "Avaric",
         "ae":  "Avestan",
         "ay":  "Aymara",
         "az":  "Azerbaijani",
         "bm":  "Bambara",
         "ba":  "Bashkir",
         "eu":  "Basque",
         "be":  "Belarusian",
         "bn":  "Bengali",
         "bh":  "Bihari languages",
         "bi":  "Bislama",
         "bs":  "Bosnian",
         "br":  "Breton",
         "bg":  "Bulgarian",
         "my":  "Burmese",
         "ca":  "Catalan, Valencian",
         "ch":  "Chamorro",
         "ce":  "Chechen",
         "ny":  "Chichewa, Chewa, Nyanja",
         "zh":  "Chinese",
         "cv":  "Chuvash",
         "kw":  "Cornish",
         "co":  "Corsican",
         "cr":  "Cree",
         "hr":  "Croatian",
         "cs":  "Czech",
         "da":  "Danish",
         "dv":  "Divehi, Dhivehi, Maldivian",
         "nl":  "Dutch, Flemish",
         "dz":  "Dzongkha",
         "en":  "English",
         "eo":  "Esperanto",
         "et":  "Estonian",
         "ee":  "Ewe",
         "fo":  "Faroese",
         "fj":  "Fijian",
         "fi":  "Finnish",
         "fr":  "French",
         "ff":  "Fulah",
         "gl":  "Galician",
         "ka":  "Georgian",
         "de":  "German",
         "el":  "Greek, Modern",
         "gn":  "Guarani",
         "gu":  "Gujarati",
         "ht":  "Haitian, Haitian Creole",
         "ha":  "Hausa",
         "he":  "Hebrew",
         "hz":  "Herero",
         "hi":  "Hindi",
         "ho":  "Hiri Motu",
         "hu":  "Hungarian",
         "ia":  "Interlingua",
         "id":  "Indonesian",
         "ie":  "Interlingue, Occidental",
         "ga":  "Irish",
         "ig":  "Igbo",
         "ik":  "Inupiaq",
         "io":  "Ido",
         "is":  "Icelandic",
         "it":  "Italian",
         "iu":  "Inuktitut",
         "ja":  "Japanese",
         "jv":  "Javanese",
         "kl":  "Kalaallisut, Greenlandic",
         "kn":  "Kannada",
         "kr":  "Kanuri",
         "ks":  "Kashmiri",
         "kk":  "Kazakh",
         "km":  "Central Khmer",
         "ki":  "Kikuyu, Gikuyu",
         "rw":  "Kinyarwanda",
         "ky":  "Kirghiz, Kyrgyz",
         "kv":  "Komi",
         "kg":  "Kongo",
         "ko":  "Korean",
         "ku":  "Kurdish",
         "kj":  "Kuanyama, Kwanyama",
         "la":  "Latin",
         "lb":  "Luxembourgish, Letzeburgesch",
         "lg":  "Ganda",
         "li":  "Limburgan, Limburger, Limburgish",
         "ln":  "Lingala",
         "lo":  "Lao",
         "lt":  "Lithuanian",
         "lu":  "Luba-Katanga",
         "lv":  "Latvian",
         "gv":  "Manx",
         "mk":  "Macedonian",
         "mg":  "Malagasy",
         "ms":  "Malay",
         "ml":  "Malayalam",
         "mt":  "Maltese",
         "mi":  "Maori",
         "mr":  "Marathi",
         "mh":  "Marshallese",
         "mn":  "Mongolian",
         "na":  "Nauru",
         "nv":  "Navajo, Navaho",
         "nd":  "North Ndebele",
         "ne":  "Nepali",
         "ng":  "Ndonga",
         "nb":  "Norwegian Bokmål",
         "nn":  "Norwegian Nynorsk",
         "no":  "Norwegian",
         "ii":  "Sichuan Yi, Nuosu",
         "nr":  "South Ndebele",
         "oc":  "Occitan",
         "oj":  "Ojibwa",
         "cu":  "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic",
         "om":  "Oromo",
         "or":  "Oriya",
         "os":  "Ossetian, Ossetic",
         "pa":  "Punjabi, Panjabi",
         "pi":  "Pali",
         "fa":  "Persian",
         "pl":  "Polish",
         "ps":  "Pashto, Pushto",
         "pt":  "Portuguese",
         "qu":  "Quechua",
         "rm":  "Romansh",
         "rn":  "Rundi",
         "ro":  "Romanian, Moldavian, Moldovan",
         "ru":  "Russian",
         "sa":  "Sanskrit",
         "sc":  "Sardinian",
         "sd":  "Sindhi",
         "se":  "Northern Sami",
         "sm":  "Samoan",
         "sg":  "Sango",
         "sr":  "Serbian",
         "gd":  "Gaelic, Scottish Gaelic",
         "sn":  "Shona",
         "si":  "Sinhala, Sinhalese",
         "sk":  "Slovak",
         "sl":  "Slovenian",
         "so":  "Somali",
         "st":  "Southern Sotho",
         "es":  "Spanish, Castilian",
         "su":  "Sundanese",
         "sw":  "Swahili",
         "ss":  "Swati",
         "sv":  "Swedish",
         "ta":  "Tamil",
         "te":  "Telugu",
         "tg":  "Tajik",
         "th":  "Thai",
         "ti":  "Tigrinya",
         "bo":  "Tibetan",
         "tk":  "Turkmen",
         "tl":  "Tagalog",
         "tn":  "Tswana",
         "to":  "Tonga",
         "tr":  "Turkish",
         "ts":  "Tsonga",
         "tt":  "Tatar",
         "tw":  "Twi",
         "ty":  "Tahitian",
         "ug":  "Uighur, Uyghur",
         "uk":  "Ukrainian",
         "ur":  "Urdu",
         "uz":  "Uzbek",
         "ve":  "Venda",
         "vi":  "Vietnamese",
         "vo":  "Volapük",
         "wa":  "Walloon",
         "cy":  "Welsh",
         "wo":  "Wolof",
         "fy":  "Western Frisian",
         "xh":  "Xhosa",
         "yi":  "Yiddish",
         "yo":  "Yoruba",
         "za":  "Zhuang, Chuang",
         "zu":  "Zulu"
    };
    return languageCodeObject[languageCode];
}

service.generateLanguageNameTranslationArray = (languageCodeGettingTranslated)=>{
    let codesThatCanBeTranslated = [
        "ar", "cs", "da", "nl", "fi", "fr", "de", 
        "el", "he", "hi", "hu", "it", "ja", "ko", 
        "nb", "pl", "pt", "ru", "zh", "es", "sv", "tr"];
    // let canCodeBeTranslated = codesThatCanBeTranslated.indexOf(languageCodeGettingTranslated) > -1;
    service.canCodeBeTranslated = codesThatCanBeTranslated.indexOf(languageCodeGettingTranslated) > -1;
    // if (!canCodeBeTranslated)
    //     return; // exit out of function if not found in array.
    if (!service.canCodeBeTranslated)
        return; // exit out of function if not found in array.
    // otherwise, continue and push to array
    let codeToName = service.convertLanguageCodeToName(languageCodeGettingTranslated);
    service.languageNameTranslationArray.push(codeToName);

};

// e.g. service.generateLanguageNameDisplayArray("hy");
service.generateLanguageNameDisplayArray = (languageCode)=>{
    // let codeToName = service.convertLanguageCodeToName("hy"); -> this returns "Armenian";
    // service.languageNameDisplayArray.push("Armenian");
    let codeToName = service.convertLanguageCodeToName(languageCode);
    service.languageNameDisplayArray.push(codeToName);

};


service.generateCurrencyNameDisplayArray = (currencyCode)=>{
    switch(currencyCode){
        case "AUD" : service.currencyNameDisplayArray.push("Australia Dollar"); break;
        case "GBP" : service.currencyNameDisplayArray.push("Great Britain Pound"); break;
        case "EUR" : service.currencyNameDisplayArray.push("Euro"); break;
        case "JPY" : service.currencyNameDisplayArray.push("Japan Yen"); break;
        case "CHF" : service.currencyNameDisplayArray.push("Switzerland Franc"); break;
        case "USD" : service.currencyNameDisplayArray.push("USA Dollar"); break;
        case "AFN" : service.currencyNameDisplayArray.push("Afghanistan Afghani"); break;
        case "ALL" : service.currencyNameDisplayArray.push("Albania Lek"); break;
        case "DZD" : service.currencyNameDisplayArray.push("Algeria Dinar"); break;
        case "AOA" : service.currencyNameDisplayArray.push("Angola Kwanza"); break;
        case "ARS" : service.currencyNameDisplayArray.push("Argentina Peso"); break;
        case "AMD" : service.currencyNameDisplayArray.push("Armenia Dram"); break;
        case "AWG" : service.currencyNameDisplayArray.push("Aruba Florin"); break;
        case "AUD" : service.currencyNameDisplayArray.push("Australia Dollar"); break;
        case "AZN" : service.currencyNameDisplayArray.push("Azerbaijan New Manat"); break;
        case "BSD" : service.currencyNameDisplayArray.push("Bahamas Dollar"); break;
        case "BHD" : service.currencyNameDisplayArray.push("Bahrain Dinar"); break;
        case "BDT" : service.currencyNameDisplayArray.push("Bangladesh Taka"); break;
        case "BBD" : service.currencyNameDisplayArray.push("Barbados Dollar"); break;
        case "BYR" : service.currencyNameDisplayArray.push("Belarus Ruble"); break;
        case "BZD" : service.currencyNameDisplayArray.push("Belize Dollar"); break;
        case "BMD" : service.currencyNameDisplayArray.push("Bermuda Dollar"); break;
        case "BTN" : service.currencyNameDisplayArray.push("Bhutan Ngultrum"); break;
        case "BOB" : service.currencyNameDisplayArray.push("Bolivia Boliviano"); break;
        case "BAM" : service.currencyNameDisplayArray.push("Bosnia Mark"); break;
        case "BWP" : service.currencyNameDisplayArray.push("Botswana Pula"); break;
        case "BRL" : service.currencyNameDisplayArray.push("Brazil Real"); break;
        case "GBP" : service.currencyNameDisplayArray.push("Great Britain Pound"); break;
        case "BND" : service.currencyNameDisplayArray.push("Brunei Dollar"); break;
        case "BGN" : service.currencyNameDisplayArray.push("Bulgaria Lev"); break;
        case "BIF" : service.currencyNameDisplayArray.push("Burundi Franc"); break;
        case "XOF" : service.currencyNameDisplayArray.push("CFA Franc BCEAO"); break;
        case "XAF" : service.currencyNameDisplayArray.push("CFA Franc BEAC"); break;
        case "XPF" : service.currencyNameDisplayArray.push("CFP Franc"); break;
        case "KHR" : service.currencyNameDisplayArray.push("Cambodia Riel"); break;
        case "CAD" : service.currencyNameDisplayArray.push("Canada Dollar"); break;
        case "CVE" : service.currencyNameDisplayArray.push("Cape Verde Escudo"); break;
        case "KYD" : service.currencyNameDisplayArray.push("Cayman Islands Dollar"); break;
        case "CLP" : service.currencyNameDisplayArray.push("Chili Peso"); break;
        case "CNY" : service.currencyNameDisplayArray.push("China Yuan/Renminbi"); break;
        case "COP" : service.currencyNameDisplayArray.push("Colombia Peso"); break;
        case "KMF" : service.currencyNameDisplayArray.push("Comoros Franc"); break;
        case "CDF" : service.currencyNameDisplayArray.push("Congo Franc"); break;
        case "CRC" : service.currencyNameDisplayArray.push("Costa Rica Colon"); break;
        case "HRK" : service.currencyNameDisplayArray.push("Croatia Kuna"); break;
        case "CUC" : service.currencyNameDisplayArray.push("Cuba Convertible Peso"); break;
        case "CUP" : service.currencyNameDisplayArray.push("Cuba Peso"); break;
        case "CZK" : service.currencyNameDisplayArray.push("Czech Koruna"); break;
        case "DKK" : service.currencyNameDisplayArray.push("Denmark Krone"); break;
        case "DJF" : service.currencyNameDisplayArray.push("Djibouti Franc"); break;
        case "DOP" : service.currencyNameDisplayArray.push("Dominican Republich Peso"); break;
        case "XCD" : service.currencyNameDisplayArray.push("East Caribbean Dollar"); break;
        case "EGP" : service.currencyNameDisplayArray.push("Egypt Pound"); break;
        case "SVC" : service.currencyNameDisplayArray.push("El Salvador Colon"); break;
        case "ETB" : service.currencyNameDisplayArray.push("Ethiopia Birr"); break;
        case "FKP" : service.currencyNameDisplayArray.push("Falkland Islands Pound"); break;
        case "FJD" : service.currencyNameDisplayArray.push("Fiji Dollar"); break;
        case "GMD" : service.currencyNameDisplayArray.push("Gambia Dalasi"); break;
        case "GEL" : service.currencyNameDisplayArray.push("Georgia Lari"); break;
        case "GHS" : service.currencyNameDisplayArray.push("Ghana New Cedi"); break;
        case "GIP" : service.currencyNameDisplayArray.push("Gibraltar Pound"); break;
        case "GTQ" : service.currencyNameDisplayArray.push("Guatemala Quetzal"); break;
        case "GNF" : service.currencyNameDisplayArray.push("Guinea Franc"); break;
        case "GYD" : service.currencyNameDisplayArray.push("Guyana Dollar"); break;
        case "HTG" : service.currencyNameDisplayArray.push("Haiti Gourde"); break;
        case "HNL" : service.currencyNameDisplayArray.push("Honduras Lempira"); break;
        case "HKD" : service.currencyNameDisplayArray.push("Hong Kong Dollar"); break;
        case "HUF" : service.currencyNameDisplayArray.push("Hungary Forint"); break;
        case "ISK" : service.currencyNameDisplayArray.push("Iceland Krona"); break;
        case "INR" : service.currencyNameDisplayArray.push("India Rupee"); break;
        case "IDR" : service.currencyNameDisplayArray.push("Indonesia Rupiah"); break;
        case "IRR" : service.currencyNameDisplayArray.push("Iran Rial"); break;
        case "IQD" : service.currencyNameDisplayArray.push("Iraq Dinar"); break;
        case "ILS" : service.currencyNameDisplayArray.push("Israel New Shekel"); break;
        case "JMD" : service.currencyNameDisplayArray.push("Jamaica Dollar"); break;
        case "JPY" : service.currencyNameDisplayArray.push("Japan Yen"); break;
        case "JOD" : service.currencyNameDisplayArray.push("Jordan Dinar"); break;
        case "KZT" : service.currencyNameDisplayArray.push("Kazakhstan Tenge"); break;
        case "KES" : service.currencyNameDisplayArray.push("Kenya Shilling"); break;
        case "KWD" : service.currencyNameDisplayArray.push("Kuwait Dinar"); break;
        case "KGS" : service.currencyNameDisplayArray.push("Kyrgyzstan Som"); break;
        case "LAK" : service.currencyNameDisplayArray.push("Laos Kip"); break;
        case "LBP" : service.currencyNameDisplayArray.push("Lebanon Pound"); break;
        case "LSL" : service.currencyNameDisplayArray.push("Lesotho Loti"); break;
        case "LRD" : service.currencyNameDisplayArray.push("Liberia Dollar"); break;
        case "LYD" : service.currencyNameDisplayArray.push("Libya Dinar"); break;
        case "MOP" : service.currencyNameDisplayArray.push("Macau Pataca"); break;
        case "MKD" : service.currencyNameDisplayArray.push("Macedonia Denar"); break;
        case "MGA" : service.currencyNameDisplayArray.push("Malagasy Ariary"); break;
        case "MWK" : service.currencyNameDisplayArray.push("Malawi Kwacha"); break;
        case "MYR" : service.currencyNameDisplayArray.push("Malaysia Ringgit"); break;
        case "MVR" : service.currencyNameDisplayArray.push("Maldives Rufiyaa"); break;
        case "MRO" : service.currencyNameDisplayArray.push("Mauritania Ouguiya"); break;
        case "MUR" : service.currencyNameDisplayArray.push("Mauritius Rupee"); break;
        case "MXN" : service.currencyNameDisplayArray.push("Mexico Peso"); break;
        case "MDL" : service.currencyNameDisplayArray.push("Moldova Leu"); break;
        case "MNT" : service.currencyNameDisplayArray.push("Mongolia Tugrik"); break;
        case "MAD" : service.currencyNameDisplayArray.push("Morocco Dirham"); break;
        case "MZN" : service.currencyNameDisplayArray.push("Mozambique New Metical"); break;
        case "MMK" : service.currencyNameDisplayArray.push("Myanmar Kyat"); break;
        case "ANG" : service.currencyNameDisplayArray.push("NL Antilles Guilder"); break;
        case "NAD" : service.currencyNameDisplayArray.push("Namibia Dollar"); break;
        case "NPR" : service.currencyNameDisplayArray.push("Nepal Rupee"); break;
        case "NZD" : service.currencyNameDisplayArray.push("New Zealand Dollar"); break;
        case "NIO" : service.currencyNameDisplayArray.push("Nicaragua Cordoba Oro"); break;
        case "NGN" : service.currencyNameDisplayArray.push("Nigeria Naira"); break;
        case "KPW" : service.currencyNameDisplayArray.push("North Korea Won"); break;
        case "NOK" : service.currencyNameDisplayArray.push("Norway Kroner"); break;
        case "OMR" : service.currencyNameDisplayArray.push("Oman Rial"); break;
        case "PKR" : service.currencyNameDisplayArray.push("Pakistan Rupee"); break;
        case "PAB" : service.currencyNameDisplayArray.push("Panama Balboa"); break;
        case "PGK" : service.currencyNameDisplayArray.push("Papua New Guinea Kina"); break;
        case "PYG" : service.currencyNameDisplayArray.push("Paraguay Guarani"); break;
        case "PEN" : service.currencyNameDisplayArray.push("Peru Nuevo Sol"); break;
        case "PHP" : service.currencyNameDisplayArray.push("Philippines Peso"); break;
        case "PLN" : service.currencyNameDisplayArray.push("Poland Zloty"); break;
        case "QAR" : service.currencyNameDisplayArray.push("Qatar Rial"); break;
        case "RON" : service.currencyNameDisplayArray.push("Romania New Lei"); break;
        case "RUB" : service.currencyNameDisplayArray.push("Russia Rouble"); break;
        case "RWF" : service.currencyNameDisplayArray.push("Rwanda Franc"); break;
        case "WST" : service.currencyNameDisplayArray.push("Samoa Tala"); break;
        case "STD" : service.currencyNameDisplayArray.push("Sao Tome/Principe Dobra"); break;
        case "SAR" : service.currencyNameDisplayArray.push("Saudi Arabia Riyal"); break;
        case "RSD" : service.currencyNameDisplayArray.push("Serbia Dinar"); break;
        case "SCR" : service.currencyNameDisplayArray.push("Seychelles Rupee"); break;
        case "SLL" : service.currencyNameDisplayArray.push("Sierra Leone Leone"); break;
        case "SGD" : service.currencyNameDisplayArray.push("Singapore Dollar"); break;
        case "SBD" : service.currencyNameDisplayArray.push("Solomon Islands Dollar"); break;
        case "SOS" : service.currencyNameDisplayArray.push("Somali Shilling"); break;
        case "ZAR" : service.currencyNameDisplayArray.push("South Africa Rand"); break;
        case "KRW" : service.currencyNameDisplayArray.push("South Korea Won"); break;
        case "URO" : service.currencyNameDisplayArray.push("Spain Peseta"); break;
        case "LKR" : service.currencyNameDisplayArray.push("Sri Lanka Rupee"); break;
        case "SHP" : service.currencyNameDisplayArray.push("St Helena Pound"); break;
        case "SDG" : service.currencyNameDisplayArray.push("Sudan Pound"); break;
        case "SRD" : service.currencyNameDisplayArray.push("Suriname Dollar"); break;
        case "SZL" : service.currencyNameDisplayArray.push("Swaziland Lilangeni"); break;
        case "SEK" : service.currencyNameDisplayArray.push("Sweden Krona"); break;
        case "CHF" : service.currencyNameDisplayArray.push("Switzerland Franc"); break;
        case "SYP" : service.currencyNameDisplayArray.push("Syria Pound"); break;
        case "TWD" : service.currencyNameDisplayArray.push("Taiwan Dollar"); break;
        case "TZS" : service.currencyNameDisplayArray.push("Tanzania Shilling"); break;
        case "THB" : service.currencyNameDisplayArray.push("Thailand Baht"); break;
        case "TOP" : service.currencyNameDisplayArray.push("Tonga Pa'anga"); break;
        case "TTD" : service.currencyNameDisplayArray.push("Trinidad/Tobago Dollar"); break;
        case "TND" : service.currencyNameDisplayArray.push("Tunisia Dinar"); break;
        case "TRY" : service.currencyNameDisplayArray.push("Turkish New Lira"); break;
        case "TMM" : service.currencyNameDisplayArray.push("Turkmenistan Manat"); break;
        case "USD" : service.currencyNameDisplayArray.push("USA Dollar"); break;
        case "UGX" : service.currencyNameDisplayArray.push("Uganda Shilling"); break;
        case "UAH" : service.currencyNameDisplayArray.push("Ukraine Hryvnia"); break;
        case "UYU" : service.currencyNameDisplayArray.push("Uruguay Peso"); break;
        case "AED" : service.currencyNameDisplayArray.push("United Arab Emirates Dirham"); break;
        case "VUV" : service.currencyNameDisplayArray.push("Vanuatu Vatu"); break;
        case "VEB" : service.currencyNameDisplayArray.push("Venezuela Bolivar"); break;
        case "VND" : service.currencyNameDisplayArray.push("Vietnam Dong"); break;
        case "YER" : service.currencyNameDisplayArray.push("Yemen Rial"); break;
        case "ZMK" : service.currencyNameDisplayArray.push("Zambia Kwacha"); break;
        case "ZWD" : service.currencyNameDisplayArray.push("Zimbabwe Dollar"); break;
    }};

    service.convertCurrencyNameToCode = (currencyName)=>{ // for use when we integrate currency exchange api
        switch(currencyName){
            case "Australia Dollar" : return "AUD";
            case "Great Britain Pound" : return "GBP";
            case "Euro" : return "EUR";
            case "Japan Yen" : return "JPY";
            case "Switzerland Franc" : return "CHF";
            case "USA Dollar" : return "USD";
            case "Afghanistan Afghani" : return "AFN";
            case "Albania Lek" : return "ALL";
            case "Algeria Dinar" : return "DZD";
            case "Angola Kwanza" : return "AOA";
            case "Argentina Peso" : return "ARS";
            case "Armenia Dram" : return "AMD";
            case "Aruba Florin" : return "AWG";
            case "Australia Dollar" : return "AUD";
            case "Azerbaijan New Manat" : return "AZN";
            case "Bahamas Dollar" : return "BSD";
            case "Bahrain Dinar" : return "BHD";
            case "Bangladesh Taka" : return "BDT";
            case "Barbados Dollar" : return "BBD";
            case "Belarus Ruble" : return "BYR";
            case "Belize Dollar" : return "BZD";
            case "Bermuda Dollar" : return "BMD";
            case "Bhutan Ngultrum" : return "BTN";
            case "Bolivia Boliviano" : return "BOB";
            case "Bosnia Mark" : return "BAM";
            case "Botswana Pula" : return "BWP";
            case "Brazil Real" : return "BRL";
            case "Great Britain Pound" : return "GBP";
            case "Brunei Dollar" : return "BND";
            case "Bulgaria Lev" : return "BGN";
            case "Burundi Franc" : return "BIF";
            case "CFA Franc BCEAO" : return "XOF";
            case "CFA Franc BEAC" : return "XAF";
            case "CFP Franc" : return "XPF";
            case "Cambodia Riel" : return "KHR";
            case "Canada Dollar" : return "CAD";
            case "Cape Verde Escudo" : return "CVE";
            case "Cayman Islands Dollar" : return "KYD";
            case "Chili Peso" : return "CLP";
            case "China Yuan/Renminbi" : return "CNY";
            case "Colombia Peso" : return "COP";
            case "Comoros Franc" : return "KMF";
            case "Congo Franc" : return "CDF";
            case "Costa Rica Colon" : return "CRC";
            case "Croatia Kuna" : return "HRK";
            case "Cuba Convertible Peso" : return "CUC";
            case "Cuba Peso" : return "CUP";
            case "Czech Koruna" : return "CZK";
            case "Denmark Krone" : return "DKK";
            case "Djibouti Franc" : return "DJF";
            case "Dominican Republich Peso" : return "DOP";
            case "East Caribbean Dollar" : return "XCD";
            case "Egypt Pound" : return "EGP";
            case "El Salvador Colon" : return "SVC";
            case "Ethiopia Birr" : return "ETB";
            case "Falkland Islands Pound" : return "FKP";
            case "Fiji Dollar" : return "FJD";
            case "Gambia Dalasi" : return "GMD";
            case "Georgia Lari" : return "GEL";
            case "Ghana New Cedi" : return "GHS";
            case "Gibraltar Pound" : return "GIP";
            case "Guatemala Quetzal" : return "GTQ";
            case "Guinea Franc" : return "GNF";
            case "Guyana Dollar" : return "GYD";
            case "Haiti Gourde" : return "HTG";
            case "Honduras Lempira" : return "HNL";
            case "Hong Kong Dollar" : return "HKD";
            case "Hungary Forint" : return "HUF";
            case "Iceland Krona" : return "ISK";
            case "India Rupee" : return "INR";
            case "Indonesia Rupiah" : return "IDR";
            case "Iran Rial" : return "IRR";
            case "Iraq Dinar" : return "IQD";
            case "Israel New Shekel" : return "ILS";
            case "Jamaica Dollar" : return "JMD";
            case "Japan Yen" : return "JPY";
            case "Jordan Dinar" : return "JOD";
            case "Kazakhstan Tenge" : return "KZT";
            case "Kenya Shilling" : return "KES";
            case "Kuwait Dinar" : return "KWD";
            case "Kyrgyzstan Som" : return "KGS";
            case "Laos Kip" : return "LAK";
            case "Lebanon Pound" : return "LBP";
            case "Lesotho Loti" : return "LSL";
            case "Liberia Dollar" : return "LRD";
            case "Libya Dinar" : return "LYD";
            case "Macau Pataca" : return "MOP";
            case "Macedonia Denar" : return "MKD";
            case "Malagasy Ariary" : return "MGA";
            case "Malawi Kwacha" : return "MWK";
            case "Malaysia Ringgit" : return "MYR";
            case "Maldives Rufiyaa" : return "MVR";
            case "Mauritania Ouguiya" : return "MRO";
            case "Mauritius Rupee" : return "MUR";
            case "Mexico Peso" : return "MXN";
            case "Moldova Leu" : return "MDL";
            case "Mongolia Tugrik" : return "MNT";
            case "Morocco Dirham" : return "MAD";
            case "Mozambique New Metical" : return "MZN";
            case "Myanmar Kyat" : return "MMK";
            case "NL Antilles Guilder" : return "ANG";
            case "Namibia Dollar" : return "NAD";
            case "Nepal Rupee" : return "NPR";
            case "New Zealand Dollar" : return "NZD";
            case "Nicaragua Cordoba Oro" : return "NIO";
            case "Nigeria Naira" : return "NGN";
            case "North Korea Won" : return "KPW";
            case "Norway Kroner" : return "NOK";
            case "Oman Rial" : return "OMR";
            case "Pakistan Rupee" : return "PKR";
            case "Panama Balboa" : return "PAB";
            case "Papua New Guinea Kina" : return "PGK";
            case "Paraguay Guarani" : return "PYG";
            case "Peru Nuevo Sol" : return "PEN";
            case "Philippines Peso" : return "PHP";
            case "Poland Zloty" : return "PLN";
            case "Qatar Rial" : return "QAR";
            case "Romania New Lei" : return "RON";
            case "Russia Rouble" : return "RUB";
            case "Rwanda Franc" : return "RWF";
            case "Samoa Tala" : return "WST";
            case "Sao Tome/Principe Dobra" : return "STD";
            case "Saudi Arabia Riyal" : return "SAR";
            case "Serbia Dinar" : return "RSD";
            case "Seychelles Rupee" : return "SCR";
            case "Sierra Leone Leone" : return "SLL";
            case "Singapore Dollar" : return "SGD";
            case "Solomon Islands Dollar" : return "SBD";
            case "Somali Shilling" : return "SOS";
            case "South Africa Rand" : return "ZAR";
            case "South Korea Won" : return "KRW";
            case "Spain Peseta" : return "URO";
            case "Sri Lanka Rupee" : return "LKR";
            case "St Helena Pound" : return "SHP";
            case "Sudan Pound" : return "SDG";
            case "Suriname Dollar" : return "SRD";
            case "Swaziland Lilangeni" : return "SZL";
            case "Sweden Krona" : return "SEK";
            case "Switzerland Franc" : return "CHF";
            case "Syria Pound" : return "SYP";
            case "Taiwan Dollar" : return "TWD";
            case "Tanzania Shilling" : return "TZS";
            case "Thailand Baht" : return "THB";
            case "Tonga Pa'anga" : return "TOP";
            case "Trinidad/Tobago Dollar" : return "TTD";
            case "Tunisia Dinar" : return "TND";
            case "Turkish New Lira" : return "TRY";
            case "Turkmenistan Manat" : return "TMM";
            case "USA Dollar" : return "USD";
            case "Uganda Shilling" : return "UGX";
            case "Ukraine Hryvnia" : return "UAH";
            case "Uruguay Peso" : return "UYU";
            case "United Arab Emirates Dirham" : return "AED";
            case "Vanuatu Vatu" : return "VUV";
            case "Venezuela Bolivar" : return "VEB";
            case "Vietnam Dong" : return "VND";
            case "Yemen Rial" : return "YER";
            case "Zambia Kwacha" : return "ZMK";
            case "Zimbabwe Dollar" : return "ZWD";
        }};

});