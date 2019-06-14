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
routing.post("/home", (req, res) => {
    console.log(req.body);
    // node stuff:
    let languageTranslator = new LanguageTranslatorV3({
    version: '2019-05-01',
    // iam_apikey: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    url: 'https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01',
    username: 'apikey',
    password: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    });

    let translateParams = {
    text: req.body.text,
    //text: "hello world" 
    model_id: req.body.source+'-'+req.body.target,
    //model_id: 'en-es'

    };

    languageTranslator.translate(translateParams)
    .then(translationResult => {
        console.log(JSON.stringify(translationResult, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });
    res.send(res.translations[0].translation);
});
 
module.exports.routing = routing;
// module.exports.languageTranslator = languageTranslator; //?
