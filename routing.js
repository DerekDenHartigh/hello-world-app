const express = require("express");
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
const routing = express.Router();

routing.post("/translate", (req, res) => {
    console.log(req.body);
    let languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    });

    let translateParams = {
    text: req.body.text,
    source: req.body.source,
    target: req.body.target
    };

    languageTranslator.translate(translateParams)
    .then(translationResult => {
        res.send(translationResult);
    })
    .catch(err => {
        console.log('error:', err);
    });
});

routing.post("/translatephrase", (req, res) => {
    console.log(req.body);
    let languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    iam_apikey: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
    url: 'https://gateway.watsonplatform.net/language-translator/api',
    });

    let translateParams = {
    text: req.body.text,
    source: req.body.source,
    target: req.body.target
    };

    languageTranslator.translate(translateParams)
    .then(translationResult => {
        res.send(translationResult);
    })
    .catch(err => {
        console.log('error:', err);
    });
});
 
module.exports = routing;
// module.exports.languageTranslator = languageTranslator; //?
