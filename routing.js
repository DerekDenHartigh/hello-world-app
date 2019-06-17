const express = require("express");
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const routing = express.Router();

routing.post("/translate", (req, res) => {
    console.log(req.body);
    let languageTranslator = new LanguageTranslatorV3({
    // version: '2018-05-01',
    iam_apikey: 'C7iG8rCu1eCTMR3VbV2II2sc-7PjeFJ9lV91EtP3JwTz',
    url: 'https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01',
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
    // version: '2018-05-01',
    iam_apikey: 'C7iG8rCu1eCTMR3VbV2II2sc-7PjeFJ9lV91EtP3JwTz',
    url: 'https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01',
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