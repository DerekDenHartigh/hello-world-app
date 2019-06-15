"use strict";

// let ApiInfo = require("../../secret.js");
// console.log(config);
// let RestCountriesApiInfo = ApiInfo.RestCountriesApiInfo;
// let IbmApiInfo = ApiInfo.IbmApiInfo;

angular
.module("HelloWorldApp")
.service("helloWorldService", function($http, $q){
    const service = this;
    service.languageArray = ["zh","pt","es"];
    languageArray.map()
// Get Countries
    // node JS
    // unirest.get("https://restcountries-v1.p.rapidapi.com/name/kazakhstan")
    // .header("X-RapidAPI-Host", "restcountries-v1.p.rapidapi.com")
    // .header("X-RapidAPI-Key", "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33")
    // .end(function (result) {
    // console.log(result.status, result.headers, result.body);
    // });
    // Rapid QL? 
    // rql.query(`{
    //     Http.get(
    //       url:"https://restcountries-v1.p.rapidapi.com/name/kazakhstan",
    //       headers : {
    //         "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
    //         "X-RapidAPI-Key": "688332cce4msh2a5ce805cd4fa7dp1cd5d1jsn7fe3c45b4f33"
    //       }
    //     ) {
      
    //     }
    //   }`)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

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
        .catch(()=>{
            console.log("there was an error");
        })
    };
        
    // langCodeTranslate (() => {
    //     //pass languagearray from api search api from your array - variabl
    // switch(languageCode){
    //     case "ab": laungageArray.push ("Abkhazian");
    //     break;
    //     case "aa": laungageArray.push ("Afar");
    //     break;
    //     case "af": laungageArray.push ("Afrikaans");
    //     break;
    //     case "ak": laungageArray.push ("Akan");
    //     break;
    //     case "sq": laungageArray.push ("Albanian");
    //     break;
    //     case "am": laungageArray.push ("Amharic");
    //     break;
    //     case "ar": laungageArray.push ("Arabic");
    //     break;
    //     case "an": laungageArray.push ("Aragonese");
    //     break;
    //     case "hy": laungageArray.push ("Armenian");
    //     break;
    //     case "as": laungageArray.push ("Assamese");
    //     break;
    //     case "av": laungageArray.push ("Avaric");
    //     break;
    //     case "ae": laungageArray.push ("Avestan");
    //     break;
    //     case "ay": laungageArray.push ("Aymara");
    //     break;
    //     case "az": laungageArray.push ("Azerbaijani");
    //     break;
    //     case "bm": laungageArray.push ("Bambara");
    //     break;
    //     case "ba": laungageArray.push ("Bashkir");
    //     break;
    //     case "eu": laungageArray.push ("Basque");
    //     break;
    //     case "be": laungageArray.push ("Belarusian");
    //     break;
    //     case "bn": laungageArray.push ("Bengali");
    //     break;
    //     case "bh": laungageArray.push ("Bihari languages");
    //     break;
    //     case "bi": laungageArray.push ("Bislama");
    //     break;
    //     case "bs": laungageArray.push ("Bosnian");
    //     break;
    //     case "br": laungageArray.push ("Breton");
    //     break;
    //     case "bg": laungageArray.push ("Bulgarian");
    //     break;
    //     case "my": laungageArray.push ("Burmese");
    //     break;
    //     case "ca": laungageArray.push ("Catalan, Valencian");
    //     break;
    //     case "ch": laungageArray.push ("Chamorro");
    //     break;
    //     case "ce": laungageArray.push ("Chechen");
    //     break;
    //     case "ny": laungageArray.push ("Chichewa, Chewa, Nyanja");
    //     break;
    //     case "zh": laungageArray.push ("Chinese");
    //     break;
    //     case "cv": laungageArray.push ("Chuvash");
    //     break;
    //     case "kw": laungageArray.push ("Cornish");
    //     break;
    //     case "co": laungageArray.push ("Corsican");
    //     break;
    //     case "cr": laungageArray.push ("Cree");
    //     break;
    //     case "hr": laungageArray.push ("Croatian");
    //     break;
    //     case "cs": laungageArray.push ("Czech");
    //     break;
    //     case "da": laungageArray.push ("Danish");
    //     break;
    //     case "dv": laungageArray.push ("Divehi, Dhivehi, Maldivian");
    //     break;
    //     case "nl": laungageArray.push ("Dutch, Flemish");
    //     break;
    //     case "dz": laungageArray.push ("Dzongkha");
    //     break;
    //     case "en": laungageArray.push ("English");
    //     break;
    //     case "eo": laungageArray.push ("Esperanto");
    //     break;
    //     case "et": laungageArray.push ("Estonian");
    //     break;
    //     case "ee": laungageArray.push ("Ewe");
    //     break;
    //     case "fo": laungageArray.push ("Faroese");
    //     break;
    //     case "fj": laungageArray.push ("Fijian");
    //     break;
    //     case "fi": laungageArray.push ("Finnish");
    //     break;
    //     case "fr": laungageArray.push ("French");
    //     break;
    //     case "ff": laungageArray.push ("Fulah");
    //     break;
    //     case "gl": laungageArray.push ("Galician");
    //     break;
    //     case "ka": laungageArray.push ("Georgian");
    //     break;
    //     case "de": laungageArray.push ("German");
    //     break;
    //     case "el": laungageArray.push ("Greek, Modern");
    //     break; 
    //     case "gn": laungageArray.push ("Guarani");
    //     break;
    //     case "gu": laungageArray.push ("Gujarati");
    //     break;
    //     case "ht": laungageArray.push ("Haitian, Haitian Creole");
    //     break;
    //     case "ha": laungageArray.push ("Hausa");
    //     break;
    //     case "he": laungageArray.push ("Hebrew");
    //     break;
    //     case "hz": laungageArray.push ("Herero");
    //     break;
    //     case "hi": laungageArray.push ("Hindi");
    //     break;
    //     case "ho": laungageArray.push ("Hiri Motu");
    //     break;
    //     case "hu": laungageArray.push ("Hungarian");
    //     break;
    //     case "ia": laungageArray.push ("Interlingua");
    //     break;
    //     case "id": laungageArray.push ("Indonesian");
    //     break;
    //     case "ie": laungageArray.push ("Interlingue, Occidental");
    //     break;
    //     case "ga": laungageArray.push ("Irish");
    //     break;
    //     case "ig": laungageArray.push ("Igbo");
    //     break;
    //     case "ik": laungageArray.push ("Inupiaq");
    //     break;
    //     case "io": laungageArray.push ("Ido");
    //     break;
    //     case "is": laungageArray.push ("Icelandic");
    //     break;
    //     case "it": laungageArray.push ("Italian");
    //     break;
    //     case "iu": laungageArray.push ("Inuktitut");
    //     break;
    //     case "ja": laungageArray.push ("Japanese");
    //     break;
    //     case "jv": laungageArray.push ("Javanese");
    //     break;
    //     case "kl": laungageArray.push ("Kalaallisut, Greenlandic");
    //     break;
    //     case "kn": laungageArray.push ("Kannada");
    //     break;
    //     case "kr": laungageArray.push ("Kanuri");
    //     break;
    //     case "ks": laungageArray.push ("Kashmiri");
    //     break;
    //     case "kk": laungageArray.push ("Kazakh");
    //     break;
    //     case "km": laungageArray.push ("Central Khmer");
    //     break;
    //     case "ki": laungageArray.push ("Kikuyu, Gikuyu");
    //     break;
    //     case "rw": laungageArray.push ("Kinyarwanda");
    //     break;
    //     case "ky": laungageArray.push ("Kirghiz, Kyrgyz");
    //     break;
    //     case "kv": laungageArray.push ("Komi");
    //     break;
    //     case "kg": laungageArray.push ("Kongo");
    //     break;
    //     case "ko": laungageArray.push ("Korean");
    //     break;
    //     case "ku": laungageArray.push ("Kurdish");
    //     break;
    //     case "kj": laungageArray.push ("Kuanyama, Kwanyama");
    //     break;
    //     case "la": laungageArray.push ("Latin");
    //     break;
    //     case "lb": laungageArray.push ("Luxembourgish, Letzeburgesch");
    //     break;
    //     case "lg": laungageArray.push ("Ganda");
    //     break;
    //     case "li": laungageArray.push ("Limburgan, Limburger, Limburgish");
    //     break;
    //     case "ln": laungageArray.push ("Lingala");
    //     break;
    //     case "lo": laungageArray.push ("Lao");
    //     break;
    //     case "lt": laungageArray.push ("Lithuanian");
    //     break;
    //     case "lu": laungageArray.push ("Luba-Katanga");
    //     break;
    //     case "lv": laungageArray.push ("Latvian");
    //     break;
    //     case "gv": laungageArray.push ("Manx");
    //     break;
    //     case "mk": laungageArray.push ("Macedonian");
    //     break;
    //     case "mg": laungageArray.push ("Malagasy");
    //     break;
    //     case "ms": laungageArray.push ("Malay");
    //     break;
    //     case "ml": laungageArray.push ("Malayalam");
    //     break;
    //     case "mt": laungageArray.push ("Maltese");
    //     break;
    //     case "mi": laungageArray.push ("Maori");
    //     break;
    //     case "mr": laungageArray.push ("Marathi");
    //     break;
    //     case "mh": laungageArray.push ("Marshallese");
    //     break;
    //     case "mn": laungageArray.push ("Mongolian");
    //     break;
    //     case "na": laungageArray.push ("Nauru");
    //     break;
    //     case "nv": laungageArray.push ("Navajo, Navaho");
    //     break;
    //     case "nd": laungageArray.push ("North Ndebele");
    //     break;
    //     case "ne": laungageArray.push ("Nepali");
    //     break;
    //     case "ng": laungageArray.push ("Ndonga");
    //     break;
    //     case "nb": laungageArray.push ("Norwegian Bokmål");
    //     break;
    //     case "nn": laungageArray.push ("Norwegian Nynorsk");
    //     break;
    //     case "no": laungageArray.push ("Norwegian");
    //     break;
    //     case "ii": laungageArray.push ("Sichuan Yi, Nuosu");
    //     break;
    //     case "nr": laungageArray.push ("South Ndebele");
    //     break;
    //     case "oc": laungageArray.push ("Occitan");
    //     break;
    //     case "oj": laungageArray.push ("Ojibwa");
    //     break;
    //     case "cu": laungageArray.push ("Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic");
    //     break;
    //     case "om": laungageArray.push ("Oromo");
    //     break;
    //     case "or": laungageArray.push ("Oriya");
    //     break;
    //     case "os": laungageArray.push ("Ossetian, Ossetic");
    //     break;
    //     case "pa": laungageArray.push ("Punjabi, Panjabi");
    //     break;
    //     case "pi": laungageArray.push ("Pali");
    //     break;
    //     case "fa": laungageArray.push ("Persian");
    //     break;
    //     case "pl": laungageArray.push ("Polish");
    //     break;
    //     case "ps": laungageArray.push ("Pashto, Pushto");
    //     break;
    //     case "pt": laungageArray.push ("Portuguese");
    //     break;
    //     case "qu": laungageArray.push ("Quechua");
    //     break;
    //     case "rm": laungageArray.push ("Romansh");
    //     break;
    //     case "rn": laungageArray.push ("Rundi");
    //     break;
    //     case "ro": laungageArray.push ("Romanian, Moldavian, Moldovan");
    //     break;
    //     case "ru": laungageArray.push ("Russian");
    //     break;
    //     case "sa": laungageArray.push ("Sanskrit");
    //     break;
    //     case "sc": laungageArray.push ("Sardinian");
    //     break;
    //     case "sd": laungageArray.push ("Sindhi");
    //     break;
    //     case "se": laungageArray.push ("Northern Sami");
    //     break;
    //     case "sm": laungageArray.push ("Samoan");
    //     break;
    //     case "sg": laungageArray.push ("Sango");
    //     break;
    //     case "sr": laungageArray.push ("Serbian");
    //     break;
    //     case "gd": laungageArray.push ("Gaelic, Scottish Gaelic");
    //     break;
    //     case "sn": laungageArray.push ("Shona");
    //     break;
    //     case "si": laungageArray.push ("Sinhala, Sinhalese");
    //     break;
    //     case "sk": laungageArray.push ("Slovak");
    //     break;
    //     case "sl": laungageArray.push ("Slovenian");
    //     break;
    //     case "so": laungageArray.push ("Somali");
    //     break;
    //     case "st": laungageArray.push ("Southern Sotho");
    //     break;
    //     case "es": laungageArray.push ("Spanish, Castilian");
    //     break;
    //     case "su": laungageArray.push ("Sundanese");
    //     break;
    //     case "sw": laungageArray.push ("Swahili");
    //     break;
    //     case "ss": laungageArray.push ("Swati");
    //     break;
    //     case "sv": laungageArray.push ("Swedish");
    //     break;
    //     case "ta": laungageArray.push ("Tamil");
    //     break;
    //     case "te": laungageArray.push ("Telugu");
    //     break;
    //     case "tg": laungageArray.push ("Tajik");
    //     break;
    //     case "th": laungageArray.push ("Thai");
    //     break;
    //     case "ti": laungageArray.push ("Tigrinya");
    //     break;
    //     case "bo": laungageArray.push ("Tibetan");
    //     break;
    //     case "tk": laungageArray.push ("Turkmen");
    //     break;
    //     case "tl": laungageArray.push ("Tagalog");
    //     break;
    //     case "tn": laungageArray.push ("Tswana");
    //     break;
    //     case "to": laungageArray.push ("Tonga");
    //     break; 
    //     case "tr": laungageArray.push ("Turkish");
    //     break;
    //     case "ts": laungageArray.push ("Tsonga");
    //     break;
    //     case "tt": laungageArray.push ("Tatar");
    //     break;
    //     case "tw": laungageArray.push ("Twi");
    //     break;
    //     case "ty": laungageArray.push ("Tahitian");
    //     break;
    //     case "ug": laungageArray.push ("Uighur, Uyghur");
    //     break;
    //     case "uk": laungageArray.push ("Ukrainian");
    //     break;
    //     case "ur": laungageArray.push ("Urdu");
    //     break;
    //     case "uz": laungageArray.push ("Uzbek");
    //     break;
    //     case "ve": laungageArray.push ("Venda");
    //     break;
    //     case "vi": laungageArray.push ("Vietnamese");
    //     break;
    //     case "vo": laungageArray.push ("Volapük");
    //     break;
    //     case "wa": laungageArray.push ("Walloon");
    //     break;
    //     case "cy": laungageArray.push ("Welsh");
    //     break;
    //     case "wo": laungageArray.push ("Wolof");
    //     break;
    //     case "fy": laungageArray.push ("Western Frisian");
    //     break;
    //     case "xh": laungageArray.push ("Xhosa");
    //     break;
    //     case "yi": laungageArray.push ("Yiddish");
    //     break;
    //     case "yo": laungageArray.push ("Yoruba");
    //     break;
    //     case "za": laungageArray.push ("Zhuang, Chuang");
    //     break;
    //     case "zu": laungageArray.push ("Zulu");
    //     break;
        
    //     }


    //     });
 
});
