"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http){
    const service = this;

    /////**********Variable initialization**********//////

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

    // service.getTimeAndDate();

       // not using this one anymore I don't think
    // service.generateUsFormatTranslatedTimes = ()=>{
    //     service.UsFormatTranslatedTimeArray = [];  
    //         service.languageCodeArray.forEach(languageCode=>{
    //             service.UsFormatTranslatedTimeArray.push({
    //                 languageName : service.convertLanguageCodeToName(languageCode),
    //                 time : service.today.toLocaleString(`${languageCode}-US`)
    //             }); // pushes object w/ languageName & formatted time onto array
    //         });
    // };


    

    /////**********Translation functions**********//////

    service.getPhraseTranslation = (englishPhrase, targetLanguage) => {
        return $http({
            url: "/translatephrase",
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
        // alert("Something went wrong with the translation API, check the console log.");
        });
    };

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
        return $http({
            url: "/translate",
            data:{
                text: preTranslatedText,
                source: 'en',  // should we give more options here?
                // target: service.convertLanguageNameToCode(targetLanguage)
                target: service.languageNametoCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            service.userTranslation = translation.data.translations[0].translation;
            let newPhrase = {
                foreign : service.userTranslation,
                english : preTranslatedText,
                language : targetLanguage // adds target language to phrase obj

            }
            service.phrases.push(newPhrase)
            service.translated = true;
        })
        .catch(err => {
        console.log('error:', err);
        // alert("Something went wrong with the translation API, check the console log.");
        });
    };

    /////**********Country Query functions**********//////

    service.getCountry = (countryName)=>{
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
            service.countryData = response.data[0];
            service.countryName = service.countryData.name;
            service.country2LetterCode = service.countryData.alpha2Code;
            service.ForeignFormatEnglishTime = service.today.toLocaleString(`en-${service.country2LetterCode}`); // couldn't set this until now

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
            console.error(error);
        })
    };

    /////**********Super Bulky Switch Functions**********//////

service.languageNametoCode = (languageName)=>{
    switch(languageName){
        case "Arabic": return "ar";
        case "Czech": return "cs";
        case "Danish": return "da";
        case "Dutch, Flemish": return "nl";
        case "Finnish": return "fi";
        case "French": return "fr";
        case "German": return "de";
        case "Greek, Modern": return "el"; 
        case "Hebrew": return "he";
        case "Hindi": return "hi";
        case "Hungarian": return "hu";
        case "Italian": return "it";
        case "Japanese": return "ja";
        case "Korean": return "ko";
        case "Norwegian Bokmål": return "nb";
        case "Polish": return "pl";
        case "Portuguese": return "pt";
        case "Russian": return "ru";
        case "Chinese": return "zh";
        case "Spanish, Castilian": return "es";
        case "Swedish": return "sv";
        case "Turkish": return "tr";
    };
}

service.generateLanguageNameTranslationArray = (languageCodeGettingTranslated)=>{
    switch(languageCodeGettingTranslated){
        case "ar": service.languageNameTranslationArray.push("Arabic");break;
        case "cs": service.languageNameTranslationArray.push("Czech");break;
        case "da": service.languageNameTranslationArray.push("Danish");break;
        case "nl": service.languageNameTranslationArray.push("Dutch, Flemish");break;
        case "fi": service.languageNameTranslationArray.push("Finnish");break;
        case "fr": service.languageNameTranslationArray.push("French");break;
        case "de": service.languageNameTranslationArray.push("German");break;
        case "el": service.languageNameTranslationArray.push("Greek, Modern");break; 
        case "he": service.languageNameTranslationArray.push("Hebrew");break;
        case "hi": service.languageNameTranslationArray.push("Hindi");break;
        case "hu": service.languageNameTranslationArray.push("Hungarian");break;
        case "it": service.languageNameTranslationArray.push("Italian");break;
        case "ja": service.languageNameTranslationArray.push("Japanese");break;
        case "ko": service.languageNameTranslationArray.push("Korean");break;
        case "nb": service.languageNameTranslationArray.push("Norwegian Bokmål");break;
        case "pl": service.languageNameTranslationArray.push("Polish");break;
        case "pt": service.languageNameTranslationArray.push("Portuguese");break;
        case "ru": service.languageNameTranslationArray.push("Russian");break;
        case "zh": service.languageNameTranslationArray.push("Chinese");break;
        case "es": service.languageNameTranslationArray.push("Spanish, Castilian");break;
        case "sv": service.languageNameTranslationArray.push("Swedish");break;
        case "tr": service.languageNameTranslationArray.push("Turkish");break;
    };
};

service.generateLanguageNameDisplayArray = (languageCode)=>{
    switch(languageCode){
        case "ab": service.languageNameDisplayArray.push ("Abkhazian"); break;
        case "aa": service.languageNameDisplayArray.push ("Afar"); break;
        case "af": service.languageNameDisplayArray.push ("Afrikaans"); break;
        case "ak": service.languageNameDisplayArray.push ("Akan"); break;
        case "sq": service.languageNameDisplayArray.push ("Albanian"); break;
        case "am": service.languageNameDisplayArray.push ("Amharic"); break;
        case "ar": service.languageNameDisplayArray.push ("Arabic"); break;
        case "an": service.languageNameDisplayArray.push ("Aragonese"); break;
        case "hy": service.languageNameDisplayArray.push ("Armenian"); break;
        case "as": service.languageNameDisplayArray.push ("Assamese"); break;
        case "av": service.languageNameDisplayArray.push ("Avaric"); break;
        case "ae": service.languageNameDisplayArray.push ("Avestan"); break;
        case "ay": service.languageNameDisplayArray.push ("Aymara"); break;
        case "az": service.languageNameDisplayArray.push ("Azerbaijani"); break;
        case "bm": service.languageNameDisplayArray.push ("Bambara"); break;
        case "ba": service.languageNameDisplayArray.push ("Bashkir"); break;
        case "eu": service.languageNameDisplayArray.push ("Basque"); break;
        case "be": service.languageNameDisplayArray.push ("Belarusian"); break;
        case "bn": service.languageNameDisplayArray.push ("Bengali"); break;
        case "bh": service.languageNameDisplayArray.push ("Bihari languages"); break;
        case "bi": service.languageNameDisplayArray.push ("Bislama"); break;
        case "bs": service.languageNameDisplayArray.push ("Bosnian"); break;
        case "br": service.languageNameDisplayArray.push ("Breton"); break;
        case "bg": service.languageNameDisplayArray.push ("Bulgarian"); break;
        case "my": service.languageNameDisplayArray.push ("Burmese"); break;
        case "ca": service.languageNameDisplayArray.push ("Catalan, Valencian"); break;
        case "ch": service.languageNameDisplayArray.push ("Chamorro"); break;
        case "ce": service.languageNameDisplayArray.push ("Chechen"); break;
        case "ny": service.languageNameDisplayArray.push ("Chichewa, Chewa, Nyanja"); break;
        case "zh": service.languageNameDisplayArray.push ("Chinese"); break;
        case "cv": service.languageNameDisplayArray.push ("Chuvash"); break;
        case "kw": service.languageNameDisplayArray.push ("Cornish"); break;
        case "co": service.languageNameDisplayArray.push ("Corsican"); break;
        case "cr": service.languageNameDisplayArray.push ("Cree"); break;
        case "hr": service.languageNameDisplayArray.push ("Croatian"); break;
        case "cs": service.languageNameDisplayArray.push ("Czech"); break;
        case "da": service.languageNameDisplayArray.push ("Danish"); break;
        case "dv": service.languageNameDisplayArray.push ("Divehi, Dhivehi, Maldivian"); break;
        case "nl": service.languageNameDisplayArray.push ("Dutch, Flemish"); break;
        case "dz": service.languageNameDisplayArray.push ("Dzongkha"); break;
        case "en": service.languageNameDisplayArray.push ("English"); break;
        case "eo": service.languageNameDisplayArray.push ("Esperanto"); break;
        case "et": service.languageNameDisplayArray.push ("Estonian"); break;
        case "ee": service.languageNameDisplayArray.push ("Ewe"); break;
        case "fo": service.languageNameDisplayArray.push ("Faroese"); break;
        case "fj": service.languageNameDisplayArray.push ("Fijian"); break;
        case "fi": service.languageNameDisplayArray.push ("Finnish"); break;
        case "fr": service.languageNameDisplayArray.push ("French"); break;
        case "ff": service.languageNameDisplayArray.push ("Fulah"); break;
        case "gl": service.languageNameDisplayArray.push ("Galician"); break;
        case "ka": service.languageNameDisplayArray.push ("Georgian"); break;
        case "de": service.languageNameDisplayArray.push ("German"); break;
        case "el": service.languageNameDisplayArray.push ("Greek, Modern"); break; 
        case "gn": service.languageNameDisplayArray.push ("Guarani"); break;
        case "gu": service.languageNameDisplayArray.push ("Gujarati"); break;
        case "ht": service.languageNameDisplayArray.push ("Haitian, Haitian Creole"); break;
        case "ha": service.languageNameDisplayArray.push ("Hausa"); break;
        case "he": service.languageNameDisplayArray.push ("Hebrew"); break;
        case "hz": service.languageNameDisplayArray.push ("Herero"); break;
        case "hi": service.languageNameDisplayArray.push ("Hindi"); break;
        case "ho": service.languageNameDisplayArray.push ("Hiri Motu"); break;
        case "hu": service.languageNameDisplayArray.push ("Hungarian"); break;
        case "ia": service.languageNameDisplayArray.push ("Interlingua"); break;
        case "id": service.languageNameDisplayArray.push ("Indonesian"); break;
        case "ie": service.languageNameDisplayArray.push ("Interlingue, Occidental"); break;
        case "ga": service.languageNameDisplayArray.push ("Irish"); break;
        case "ig": service.languageNameDisplayArray.push ("Igbo"); break;
        case "ik": service.languageNameDisplayArray.push ("Inupiaq"); break;
        case "io": service.languageNameDisplayArray.push ("Ido"); break;
        case "is": service.languageNameDisplayArray.push ("Icelandic"); break;
        case "it": service.languageNameDisplayArray.push ("Italian"); break;
        case "iu": service.languageNameDisplayArray.push ("Inuktitut"); break;
        case "ja": service.languageNameDisplayArray.push ("Japanese"); break;
        case "jv": service.languageNameDisplayArray.push ("Javanese"); break;
        case "kl": service.languageNameDisplayArray.push ("Kalaallisut, Greenlandic"); break;
        case "kn": service.languageNameDisplayArray.push ("Kannada"); break;
        case "kr": service.languageNameDisplayArray.push ("Kanuri"); break;
        case "ks": service.languageNameDisplayArray.push ("Kashmiri"); break;
        case "kk": service.languageNameDisplayArray.push ("Kazakh"); break;
        case "km": service.languageNameDisplayArray.push ("Central Khmer"); break;
        case "ki": service.languageNameDisplayArray.push ("Kikuyu, Gikuyu"); break;
        case "rw": service.languageNameDisplayArray.push ("Kinyarwanda"); break;
        case "ky": service.languageNameDisplayArray.push ("Kirghiz, Kyrgyz"); break;
        case "kv": service.languageNameDisplayArray.push ("Komi"); break;
        case "kg": service.languageNameDisplayArray.push ("Kongo"); break;
        case "ko": service.languageNameDisplayArray.push ("Korean"); break;
        case "ku": service.languageNameDisplayArray.push ("Kurdish"); break;
        case "kj": service.languageNameDisplayArray.push ("Kuanyama, Kwanyama"); break;
        case "la": service.languageNameDisplayArray.push ("Latin"); break;
        case "lb": service.languageNameDisplayArray.push ("Luxembourgish, Letzeburgesch"); break;
        case "lg": service.languageNameDisplayArray.push ("Ganda"); break;
        case "li": service.languageNameDisplayArray.push ("Limburgan, Limburger, Limburgish"); break;
        case "ln": service.languageNameDisplayArray.push ("Lingala"); break;
        case "lo": service.languageNameDisplayArray.push ("Lao"); break;
        case "lt": service.languageNameDisplayArray.push ("Lithuanian"); break;
        case "lu": service.languageNameDisplayArray.push ("Luba-Katanga"); break;
        case "lv": service.languageNameDisplayArray.push ("Latvian"); break;
        case "gv": service.languageNameDisplayArray.push ("Manx"); break;
        case "mk": service.languageNameDisplayArray.push ("Macedonian"); break;
        case "mg": service.languageNameDisplayArray.push ("Malagasy"); break;
        case "ms": service.languageNameDisplayArray.push ("Malay"); break;
        case "ml": service.languageNameDisplayArray.push ("Malayalam"); break;
        case "mt": service.languageNameDisplayArray.push ("Maltese"); break;
        case "mi": service.languageNameDisplayArray.push ("Maori"); break;
        case "mr": service.languageNameDisplayArray.push ("Marathi"); break;
        case "mh": service.languageNameDisplayArray.push ("Marshallese"); break;
        case "mn": service.languageNameDisplayArray.push ("Mongolian"); break;
        case "na": service.languageNameDisplayArray.push ("Nauru"); break;
        case "nv": service.languageNameDisplayArray.push ("Navajo, Navaho"); break;
        case "nd": service.languageNameDisplayArray.push ("North Ndebele"); break;
        case "ne": service.languageNameDisplayArray.push ("Nepali"); break;
        case "ng": service.languageNameDisplayArray.push ("Ndonga"); break;
        case "nb": service.languageNameDisplayArray.push ("Norwegian Bokmål"); break;
        case "nn": service.languageNameDisplayArray.push ("Norwegian Nynorsk"); break;
        case "no": service.languageNameDisplayArray.push ("Norwegian"); break;
        case "ii": service.languageNameDisplayArray.push ("Sichuan Yi, Nuosu"); break;
        case "nr": service.languageNameDisplayArray.push ("South Ndebele"); break;
        case "oc": service.languageNameDisplayArray.push ("Occitan"); break;
        case "oj": service.languageNameDisplayArray.push ("Ojibwa"); break;
        case "cu": service.languageNameDisplayArray.push ("Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic"); break;
        case "om": service.languageNameDisplayArray.push ("Oromo"); break;
        case "or": service.languageNameDisplayArray.push ("Oriya"); break;
        case "os": service.languageNameDisplayArray.push ("Ossetian, Ossetic"); break;
        case "pa": service.languageNameDisplayArray.push ("Punjabi, Panjabi"); break;
        case "pi": service.languageNameDisplayArray.push ("Pali"); break;
        case "fa": service.languageNameDisplayArray.push ("Persian"); break;
        case "pl": service.languageNameDisplayArray.push ("Polish"); break;
        case "ps": service.languageNameDisplayArray.push ("Pashto, Pushto"); break;
        case "pt": service.languageNameDisplayArray.push ("Portuguese"); break;
        case "qu": service.languageNameDisplayArray.push ("Quechua"); break;
        case "rm": service.languageNameDisplayArray.push ("Romansh"); break;
        case "rn": service.languageNameDisplayArray.push ("Rundi"); break;
        case "ro": service.languageNameDisplayArray.push ("Romanian, Moldavian, Moldovan"); break;
        case "ru": service.languageNameDisplayArray.push ("Russian"); break;
        case "sa": service.languageNameDisplayArray.push ("Sanskrit"); break;
        case "sc": service.languageNameDisplayArray.push ("Sardinian"); break;
        case "sd": service.languageNameDisplayArray.push ("Sindhi"); break;
        case "se": service.languageNameDisplayArray.push ("Northern Sami"); break;
        case "sm": service.languageNameDisplayArray.push ("Samoan"); break;
        case "sg": service.languageNameDisplayArray.push ("Sango"); break;
        case "sr": service.languageNameDisplayArray.push ("Serbian"); break;
        case "gd": service.languageNameDisplayArray.push ("Gaelic, Scottish Gaelic"); break;
        case "sn": service.languageNameDisplayArray.push ("Shona"); break;
        case "si": service.languageNameDisplayArray.push ("Sinhala, Sinhalese"); break;
        case "sk": service.languageNameDisplayArray.push ("Slovak"); break;
        case "sl": service.languageNameDisplayArray.push ("Slovenian"); break;
        case "so": service.languageNameDisplayArray.push ("Somali"); break;
        case "st": service.languageNameDisplayArray.push ("Southern Sotho"); break;
        case "es": service.languageNameDisplayArray.push ("Spanish, Castilian"); break;
        case "su": service.languageNameDisplayArray.push ("Sundanese"); break;
        case "sw": service.languageNameDisplayArray.push ("Swahili"); break;
        case "ss": service.languageNameDisplayArray.push ("Swati"); break;
        case "sv": service.languageNameDisplayArray.push ("Swedish"); break;
        case "ta": service.languageNameDisplayArray.push ("Tamil"); break;
        case "te": service.languageNameDisplayArray.push ("Telugu"); break;
        case "tg": service.languageNameDisplayArray.push ("Tajik"); break;
        case "th": service.languageNameDisplayArray.push ("Thai"); break;
        case "ti": service.languageNameDisplayArray.push ("Tigrinya"); break;
        case "bo": service.languageNameDisplayArray.push ("Tibetan"); break;
        case "tk": service.languageNameDisplayArray.push ("Turkmen"); break;
        case "tl": service.languageNameDisplayArray.push ("Tagalog"); break;
        case "tn": service.languageNameDisplayArray.push ("Tswana"); break;
        case "to": service.languageNameDisplayArray.push ("Tonga"); break; 
        case "tr": service.languageNameDisplayArray.push ("Turkish"); break;
        case "ts": service.languageNameDisplayArray.push ("Tsonga"); break;
        case "tt": service.languageNameDisplayArray.push ("Tatar"); break;
        case "tw": service.languageNameDisplayArray.push ("Twi"); break;
        case "ty": service.languageNameDisplayArray.push ("Tahitian"); break;
        case "ug": service.languageNameDisplayArray.push ("Uighur, Uyghur"); break;
        case "uk": service.languageNameDisplayArray.push ("Ukrainian"); break;
        case "ur": service.languageNameDisplayArray.push ("Urdu"); break;
        case "uz": service.languageNameDisplayArray.push ("Uzbek"); break;
        case "ve": service.languageNameDisplayArray.push ("Venda"); break;
        case "vi": service.languageNameDisplayArray.push ("Vietnamese"); break;
        case "vo": service.languageNameDisplayArray.push ("Volapük"); break;
        case "wa": service.languageNameDisplayArray.push ("Walloon"); break;
        case "cy": service.languageNameDisplayArray.push ("Welsh"); break;
        case "wo": service.languageNameDisplayArray.push ("Wolof"); break;
        case "fy": service.languageNameDisplayArray.push ("Western Frisian"); break;
        case "xh": service.languageNameDisplayArray.push ("Xhosa"); break;
        case "yi": service.languageNameDisplayArray.push ("Yiddish"); break;
        case "yo": service.languageNameDisplayArray.push ("Yoruba"); break;
        case "za": service.languageNameDisplayArray.push ("Zhuang, Chuang"); break;
        case "zu": service.languageNameDisplayArray.push ("Zulu"); break;
        
    };
};

service.convertLanguageCodeToName = (languageCode)=>{
    switch(languageCode){
        case "ab": return "Abkhazian";
        case "aa": return "Afar";
        case "af": return "Afrikaans";
        case "ak": return "Akan";
        case "sq": return "Albanian";
        case "am": return "Amharic";
        case "ar": return "Arabic";
        case "an": return "Aragonese";
        case "hy": return "Armenian";
        case "as": return "Assamese";
        case "av": return "Avaric";
        case "ae": return "Avestan";
        case "ay": return "Aymara";
        case "az": return "Azerbaijani";
        case "bm": return "Bambara";
        case "ba": return "Bashkir";
        case "eu": return "Basque";
        case "be": return "Belarusian";
        case "bn": return "Bengali";
        case "bh": return "Bihari languages";
        case "bi": return "Bislama";
        case "bs": return "Bosnian";
        case "br": return "Breton";
        case "bg": return "Bulgarian";
        case "my": return "Burmese";
        case "ca": return "Catalan, Valencian";
        case "ch": return "Chamorro";
        case "ce": return "Chechen";
        case "ny": return "Chichewa, Chewa, Nyanja";
        case "zh": return "Chinese";
        case "cv": return "Chuvash";
        case "kw": return "Cornish";
        case "co": return "Corsican";
        case "cr": return "Cree";
        case "hr": return "Croatian";
        case "cs": return "Czech";
        case "da": return "Danish";
        case "dv": return "Divehi, Dhivehi, Maldivian";
        case "nl": return "Dutch, Flemish";
        case "dz": return "Dzongkha";
        case "en": return "English";
        case "eo": return "Esperanto";
        case "et": return "Estonian";
        case "ee": return "Ewe";
        case "fo": return "Faroese";
        case "fj": return "Fijian";
        case "fi": return "Finnish";
        case "fr": return "French";
        case "ff": return "Fulah";
        case "gl": return "Galician";
        case "ka": return "Georgian";
        case "de": return "German";
        case "el": return "Greek, Modern";
        case "gn": return "Guarani";
        case "gu": return "Gujarati";
        case "ht": return "Haitian, Haitian Creole";
        case "ha": return "Hausa";
        case "he": return "Hebrew";
        case "hz": return "Herero";
        case "hi": return "Hindi";
        case "ho": return "Hiri Motu";
        case "hu": return "Hungarian";
        case "ia": return "Interlingua";
        case "id": return "Indonesian";
        case "ie": return "Interlingue, Occidental";
        case "ga": return "Irish";
        case "ig": return "Igbo";
        case "ik": return "Inupiaq";
        case "io": return "Ido";
        case "is": return "Icelandic";
        case "it": return "Italian";
        case "iu": return "Inuktitut";
        case "ja": return "Japanese";
        case "jv": return "Javanese";
        case "kl": return "Kalaallisut, Greenlandic";
        case "kn": return "Kannada";
        case "kr": return "Kanuri";
        case "ks": return "Kashmiri";
        case "kk": return "Kazakh";
        case "km": return "Central Khmer";
        case "ki": return "Kikuyu, Gikuyu";
        case "rw": return "Kinyarwanda";
        case "ky": return "Kirghiz, Kyrgyz";
        case "kv": return "Komi";
        case "kg": return "Kongo";
        case "ko": return "Korean";
        case "ku": return "Kurdish";
        case "kj": return "Kuanyama, Kwanyama";
        case "la": return "Latin";
        case "lb": return "Luxembourgish, Letzeburgesch";
        case "lg": return "Ganda";
        case "li": return "Limburgan, Limburger, Limburgish";
        case "ln": return "Lingala";
        case "lo": return "Lao";
        case "lt": return "Lithuanian";
        case "lu": return "Luba-Katanga";
        case "lv": return "Latvian";
        case "gv": return "Manx";
        case "mk": return "Macedonian";
        case "mg": return "Malagasy";
        case "ms": return "Malay";
        case "ml": return "Malayalam";
        case "mt": return "Maltese";
        case "mi": return "Maori";
        case "mr": return "Marathi";
        case "mh": return "Marshallese";
        case "mn": return "Mongolian";
        case "na": return "Nauru";
        case "nv": return "Navajo, Navaho";
        case "nd": return "North Ndebele";
        case "ne": return "Nepali";
        case "ng": return "Ndonga";
        case "nb": return "Norwegian Bokmål";
        case "nn": return "Norwegian Nynorsk";
        case "no": return "Norwegian";
        case "ii": return "Sichuan Yi, Nuosu";
        case "nr": return "South Ndebele";
        case "oc": return "Occitan";
        case "oj": return "Ojibwa";
        case "cu": return "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic";
        case "om": return "Oromo";
        case "or": return "Oriya";
        case "os": return "Ossetian, Ossetic";
        case "pa": return "Punjabi, Panjabi";
        case "pi": return "Pali";
        case "fa": return "Persian";
        case "pl": return "Polish";
        case "ps": return "Pashto, Pushto";
        case "pt": return "Portuguese";
        case "qu": return "Quechua";
        case "rm": return "Romansh";
        case "rn": return "Rundi";
        case "ro": return "Romanian, Moldavian, Moldovan";
        case "ru": return "Russian";
        case "sa": return "Sanskrit";
        case "sc": return "Sardinian";
        case "sd": return "Sindhi";
        case "se": return "Northern Sami";
        case "sm": return "Samoan";
        case "sg": return "Sango";
        case "sr": return "Serbian";
        case "gd": return "Gaelic, Scottish Gaelic";
        case "sn": return "Shona";
        case "si": return "Sinhala, Sinhalese";
        case "sk": return "Slovak";
        case "sl": return "Slovenian";
        case "so": return "Somali";
        case "st": return "Southern Sotho";
        case "es": return "Spanish, Castilian";
        case "su": return "Sundanese";
        case "sw": return "Swahili";
        case "ss": return "Swati";
        case "sv": return "Swedish";
        case "ta": return "Tamil";
        case "te": return "Telugu";
        case "tg": return "Tajik";
        case "th": return "Thai";
        case "ti": return "Tigrinya";
        case "bo": return "Tibetan";
        case "tk": return "Turkmen";
        case "tl": return "Tagalog";
        case "tn": return "Tswana";
        case "to": return "Tonga";
        case "tr": return "Turkish";
        case "ts": return "Tsonga";
        case "tt": return "Tatar";
        case "tw": return "Twi";
        case "ty": return "Tahitian";
        case "ug": return "Uighur, Uyghur";
        case "uk": return "Ukrainian";
        case "ur": return "Urdu";
        case "uz": return "Uzbek";
        case "ve": return "Venda";
        case "vi": return "Vietnamese";
        case "vo": return "Volapük";
        case "wa": return "Walloon";
        case "cy": return "Welsh";
        case "wo": return "Wolof";
        case "fy": return "Western Frisian";
        case "xh": return "Xhosa";
        case "yi": return "Yiddish";
        case "yo": return "Yoruba";
        case "za": return "Zhuang, Chuang";
        case "zu": return "Zulu";
    };
}

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
