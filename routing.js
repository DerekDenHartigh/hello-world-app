const express = require("express");
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
const routing = express.Router();


//curl stuff:
// curl --user apikey:NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp 
// --request POST 
// --header "Content-Type: application/json" 
// --data "{\"text\":[\"Hello\"],\"model_id\":\"en-es\"}" 
// "https://gateway.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01"


// accept POST request at URI: /routing
// routing.post("https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01", (req, res) => {
routing.post("/translate", (req, res) => {
    console.log(req.body);
    // node stuff:
    let languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    // url: 'https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01',
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    // username: 'apikey',
    // password: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    });

    let translateParams = {
    // text: req.body.text,
    text: "Winner winner chicken dinner!",
    // model_id: req.body.source+'-'+req.body.target,
    // model_id: 'en-es'
    source: "en",
    target: "es"
    /**
text, string[]
Input text in UTF-8 encoding. Multiple entries will result in multiple translations in the response.

model_id, string
A globally unique string that identifies the underlying model that is used for translation.

source, string
Translation source language code.

target, string
Translation target language code.
     */
    };

    languageTranslator.translate(translateParams)
    .then(translationResult => {
        console.log(JSON.stringify(translationResult, null, 2));
        res.send(translationResult);
    })
    .catch(err => {
        console.log('error:', err);
    });
    // res.send(res.translations[0].translation);
});
 
module.exports = routing;
// module.exports.languageTranslator = languageTranslator; //?
