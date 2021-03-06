"use strict";
angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;

    /////**********Variable initialization**********//////
    service.multipleLanguages = true;
    service.canCodeBeTranslated = true;
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
    // these currency rates are from 6/27/19 (11:00AM), keeping them as an offline backup in case there is an issue with our api and our app cannot GET the current rates
    service.EuroCurrencyRates = { 
        AED: 4.175358,AFN: 92.619716,ALL: 122.455499,AMD: 542.566042,ANG: 2.132038,AOA: 386.784813,ARS: 48.778867,AUD: 1.624108,AWG: 2.046047,AZN: 1.938067,BAM: 1.954432,BBD: 2.295779,BDT: 96.07552,BGN: 1.956136,BHD: 0.42859,BIF: 2098.335313,BMD: 1.136693,BND: 1.535448,BOB: 7.856993,BRL: 4.399855,BSD: 1.137091,BTC: 0.000097909285,BTN: 78.48945,BWP: 12.070571,BYN: 2.322606,BYR: 22279.183172,BZD: 2.291971,CAD: 1.491284,CDF: 1888.047159,CHF: 1.110844,CLF: 0.027984,CLP: 772.064761,CNY: 7.817032,COP: 3631.847865,CRC: 663.641157,CUC: 1.136693,CUP: 30.122365,CVE: 110.599665,CZK: 25.452838,DJF: 202.01287,DKK: 7.464208,DOP: 57.994333,DZD: 135.010705,EGP: 18.966406,ERN: 17.050079,ETB: 33.043899,EUR: 1,FJD: 2.428374,FKP: 0.893872,GBP: 0.895793,GEL: 3.239532,GGP: 0.894938,GHS: 6.194933,GIP: 0.893873,GMD: 56.442467,GNF: 10491.676403,GTQ: 8.760891,GYD: 237.443997,HKD: 8.881176,HNL: 28.042586,HRK: 7.39771,HTG: 106.594508,HUF: 323.876785,IDR: 16076.249368,ILS: 4.067372,IMP: 0.894938,INR: 78.485815,IQD: 1352.664693,IRR: 47860.459836,ISK: 141.733886,JEP: 0.894938,JMD: 147.804874,JOD: 0.805941,JPY: 122.553123,KES: 116.351825,KGS: 79.12202,KHR: 4626.340723,KMF: 491.790076,KPW: 1023.088606,KRW: 1314.132893,KWD: 0.344982,KYD: 0.947633,KZT: 432.676481,LAK: 9849.444661,LBP: 1712.939467,LKR: 200.7291,LRD: 221.967744,LSL: 16.243486,LTL: 3.356359,LVL: 0.687575,LYD: 1.589622,MAD: 10.88474,MDL: 20.608815,MGA: 4148.929848,MKD: 61.570137,MMK: 1725.442898,MNT: 3025.186537,MOP: 9.150833,MRO: 405.799072,MUR: 40.44401,MVR: 17.50365,MWK: 861.192287,MXN: 21.789839,MYR: 4.70733,MZN: 70.566208,NAD: 16.24287,NGN: 409.209656,NIO: 37.969121,NOK: 9.686307,NPR: 125.746704,NZD: 1.697742,OMR: 0.437672,PAB: 1.137091,PEN: 3.749268,PGK: 3.836355,PHP: 58.170838,PKR: 185.845579,PLN: 4.254517,PYG: 7068.983677,QAR: 4.138665,RON: 4.725403,RSD: 117.897435,RUB: 71.686706,RWF: 1034.390647,SAR: 4.264073,SBD: 9.36834,SCR: 15.527798,SDG: 51.295569,SEK: 10.548113,SGD: 1.538372,SHP: 1.50146,SLL: 10179.085462,SOS: 662.691611,SRD: 8.477482,STD: 23928.069622,SVC: 9.949985,SYP: 585.397093,SZL: 16.243512,THB: 35.004429,TJS: 10.733451,TMT: 3.989792,TND: 3.262025,TOP: 2.590239,TRY: 6.555767,TTD: 7.705585,TWD: 35.272746,TZS: 2618.25588,UAH: 29.759761,UGX: 4201.444224,USD: 1.136693,UYU: 39.983751,UZS: 9724.408706,VEF: 11.352726,VND: 26501.997738,VUV: 130.869802,WST: 2.993535,XAF: 655.49709,XAG: 0.074699,XAU: 0.000809,XCD: 3.072083,XDR: 0.818326,XOF: 655.872037,XPF: 119.637039,YER: 284.509293,ZAR: 16.100145,ZMK: 10231.590179,ZMW: 14.667901,ZWL: 366.418691
    }

    service.phrases = [
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
        {
            foreign: "",
            english: 'enter your own phrase below',
            category: 'custom'
        },
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
        }

        ];
       
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
        service.unlockLanguageOptions = true;
    };

    service.resetAllCountryParams();

    service.convertRawArraysToList = ()=>{
        service.languageDisplayList = service.languageNameDisplayArray.join(", ");
        service.currencyDisplayList = service.currencyNameDisplayArray.join(", ");
    };

    service.generateUsFormatEnglishTime = ()=>{
        service.UsFormatEnglishTime = service.today.toLocaleString('en-US');
    }

    service.generateForeignFormatTranslatedTimes = ()=>{
        service.ForeignFormatTranslatedTimeArray = [];
            service.languageCodeArray.forEach(languageCode=>{
                service.ForeignFormatTranslatedTimeArray.push({
                    languageName : service.convertLanguageCodeToName(languageCode),
                    time : service.today.toLocaleString(`${languageCode}-${service.country2LetterCode}`)
                });
            });
    };

    service.getTimeAndDate = ()=>{
        service.today = new Date();
        service.generateUsFormatEnglishTime();
        service.generateForeignFormatTranslatedTimes();
    };

    service.getPhraseTranslation = (englishPhrase, targetLanguage) => {
        return $http({
            url: "/translate",
            data:{
                text: englishPhrase,
                source: 'en',
                target: service.languageNametoCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            let translatedPhrase = translation.data.translations[0].translation;
            return translatedPhrase;
        })
        .catch(err => {
            console.log('error:', err);
        });
    };

    service.translatePhrases = (targetLanguage)=>{
        service.phrases.forEach(function(phrase) {
            phrase.show = false // hides phrase until translated
            phrase.audioSynthesized = false; // hides speaker until phrase is translated
            service.getPhraseTranslation(phrase.english, targetLanguage)
                .then((phraseTranslation)=>{
                    phrase.foreign = phraseTranslation;
                    phrase.language = targetLanguage; // adds target language to phrase obj
                    phrase.show = true;
                    service.audioSynthesizePhrase(phrase);
                    return phrase;
                })
                .catch((err)=>{
                    console.error(err);
                })
        });
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
                source: 'en',
                target: service.languageNametoCode(targetLanguage)
            },
            method: 'POST'
        })
        .then(translation => {
            service.userTranslation = translation.data.translations[0].translation;
            let newPhrase = {
                foreign : service.userTranslation,
                english : preTranslatedText,
                language : targetLanguage, // adds target language to phrase obj
                show : true,
                category : 'custom' // categorizes phrase 4 display
            }
            service.phrases.push(newPhrase);
            service.audioSynthesizePhrase(newPhrase);
        })
        .catch(err => {
            console.error('error:', err);
        });
    };

    service.getCountry = (countryName)=>{
        service.countrySearched = true;
        service.resetAllCountryParams();
        service.getCurrencyRates(); // gets current currency conversion obj
        return $http({ 
            url:`https://restcountries-v1.p.rapidapi.com/name/${countryName}`,
            headers : {
              "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
              "X-RapidAPI-Key": "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33"
              // backup key: 03040c0d52msh78fc4629e3db02ep1913adjsn6c5d67b74466
            },
            method: "GET",
        })
        .then((response) => {
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
            service.isAudioTranslatable(service.languageCodeArray[0]); // checks to see if the first translatable language can also be audioTranslated, if it can, service.audioTranslatable is toggled true allowing the speakers to show up, and the service.voice is set.
            service.generateForeignFormatTranslatedTimes(); 
            service.convertRawArraysToList();
            
            service.countryQueried = true; // toggles the displayData ng-ifs
            return response;
        })
        .catch((error) => { 
            service.countrySearched = false; // redirects back to search
            console.error(error);
        })
    };

    service.audioTranslatableLanguageArray = ["de", "en", "es", "fr", "it", "ja", "pt"] // took en out
    service.audioTranslatable = false;

    service.isAudioTranslatable = (sourceLanguageCode)=>{
        service.audioTranslatable = false;
        switch(sourceLanguageCode){
            case "de" : service.voice = "de-DE_BirgitV2Voice"; service.audioTranslatable=true; break;
            // case "en" : service.voice = "en-US_AllisonV2Voice"; service.audioTranslatable=true; break;
            case "es" : service.voice = "es-ES_EnriqueVoice"; service.audioTranslatable=true; break;
            case "fr" : service.voice = "fr-FR_ReneeVoice"; service.audioTranslatable=true; break;
            case "it" : service.voice = "it-IT_FrancescaV2Voice"; service.audioTranslatable=true; break;
            case "ja" : service.voice = "ja-JP_EmiVoice"; service.audioTranslatable=true; break;
            case "pt" : service.voice = "pt-BR_IsabelaVoice"; service.audioTranslatable=true; break;
            default : service.audioTranslatable=false; break; // used to prevent calls w/ untranslatable languages
        };
    };

    service.hasMultipleLanguages = ()=>{
        if (service.languageNameTranslationArray.length>1){
            service.multipleLanguages = true;
        } else {
            service.multipleLanguages = false;
        }
    };

    service.textToSpeech2 = (phrase) => {
        return $q( (resolve, reject) => {
            let sourceLanguageCode = service.languageNametoCode(phrase.language); // foreign lang
            if (service.audioTranslatableLanguageArray.indexOf(sourceLanguageCode)!==-1){ // checks to see if language is translatable by textToSpeech
                service.isAudioTranslatable(sourceLanguageCode); // sets service.voice, toggles boolean service.audioTranslatable 
                if(service.audioTranslatable === false){return;} // kills the function if not audiotranslatable, prevents unsuccessful http request from going through
                return $http({
                    url: "/synthesize",
                    data:{
                        text: phrase.foreign,
                        voice: service.voice,
                        accept: 'audio/mp3'
                    },
                    method: 'POST',
                })
                .then(message => {
                    resolve('Synthesis Complete');
                })
                .catch(err => {
                    // console.error('error:', err);
                    reject(err)
                });
            } else {
                service.unlockLanguageOptions = true; // unlocks language selection, shows translated phrases
                 reject('Synthesis Skipped - language incompatible with Watson text-to-speech');
            }
        })
    };

    service.audioSynthesizePhrase = (phrase)=>{
        service.textToSpeech2(phrase)
            .then((id)=>{ // can't send data due to inability to stringify
                let audioId = phrase.foreign.replace('?', '').replace(/\s+/g, '').replace('.', ''); // remove punctuation for file naming
                phrase.id = audioId;
                phrase.audioSynthesized = true; // shows speaker button
            })
            .catch((err)=>{
                // console.error(err);
                phrase.audioSynthesized = false; // if an error happens, hides speaker
            });
    };

    service.getCurrencyRates = ()=>{
        if (service.currencyQueried === true){return;} // prevents unnecessary api calls, on init its false
        return $http({
            url: '/currency',
            // backup key : 793aaafa8706d8ba00331225d9f0a740
            dataType: 'jsonp',
            method: 'GET',
        })
        .then((currencyData)=>{
            service.EuroCurrencyRates = currencyData.data.rates;
            service.EuroToUsdConversionFactor = (1/currencyData.data.rates.USD);
            service.currencyQueried = true;
        })
        .catch((err)=>{
            console.error(err);
        })
    };

service.languageNametoCode = (languageName)=>{
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
    service.canCodeBeTranslated = codesThatCanBeTranslated.indexOf(languageCodeGettingTranslated) > -1;
    if (!service.canCodeBeTranslated)
        return;
    let codeToName = service.convertLanguageCodeToName(languageCodeGettingTranslated);
    service.languageNameTranslationArray.push(codeToName);

};

service.generateLanguageNameDisplayArray = (languageCode)=>{
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

    service.convertCurrencyNameToCode = (currencyName)=>{
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