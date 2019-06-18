"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.countryData;
    service.countryQueried = false; // has a country been queried?
    service.translated = false; // has a translation been done?
    service.userTranslation = ""; // eventually becomes translated user text
    service.languageList = "" // displayable list of languages
    service.currencyList = "" // displayable list of currencies // still needs to be done
    service.languageCodeArray = [];  // hardcoded 4 testing will need to delete before production
    service.languageNameTranslationArray = []; // hardcoded 4 testing will need to delete before production
    service.languageNameDisplayArray = [];
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

    service.resetAllCountryParams = ()=>{
        service.translated = false; // hides translations
        service.userTranslation = "";
        service.languageList = "";
        service.currencyList = ""; 
        service.languageCodeArray = [];  
        service.languageNameTranslationArray = [];
        service.languageNameDisplayArray = [];
        service.currencyArray = [];
        service.countryData = null;
        service.languageList;
        service.currencyList;
        // won't need to reset phrases since service.translated = false will hide them until they are re-translated
    }

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
        service.languageList = service.languageNameDisplayArray.join(", ");
        service.currencyList = service.currencyArray.join(", ");
// for testing below here, be sure to delete it:
        // service.languageList = service.languageCodeArray.join(", "); // this array will later be used to make languageNameTranslationArray
        // bug, when I search taiwan, it set the languageList as zh(chinese), though the display was still spanish, when I translated things, it was translating in spanish, though the only option was spanish
    };

    service.getCountry = (countryName)=>{
        service.resetAllCountryParams();
        // console.log("getting data");
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
            service.languageCodeArray.forEach(languageCode => {
                service.generateLanguageNameTranslationArray(languageCode);
                service.generateLanguageNameDisplayArray(languageCode);
              });
            console.log(service.languageCodeArray);
            console.log(service.languageNameTranslationArray);
            service.convertRawArraysToList();
            service.countryQueried = true; // toggles the displayData ng-ifs
            return response;
        })
        .catch((error) => { 
            console.error(error);
        })
    };

    // service.convertLanguageNameToCode = (targetLanguage)=>{
    //     let index = service.languageNameTranslationArray.indexOf(targetLanguage); // since languageNameTranslationArray is not yet being created by the getCountry function, this will still select the 0th index of other languages, its a hardcoded feature, not a bug.
    //     let languageCode = service.languageCodeArray[index];
    //     console.log(`index: ${index}, languageCode: ${languageCode}`);
    //     return languageCode;
    // };
    
    service.getTranslation = (preTranslatedText, targetLanguage) => {
        // console.log(`targetLanguage: ${targetLanguage}`)
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
            // console.log(translation);
            service.userTranslation = translation.data.translations[0].translation;
            service.translated = true;
        })
        .catch(err => {
        console.log('error:', err);
        alert("Something went wrong with the translation API, check the console log.");
        });
    };

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
        default: alert("sorry, that language is not supported with our translator"); return null;
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
}


});