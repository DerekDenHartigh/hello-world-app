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

/**
 * Translate
 * curl -X POST -u "apikey:8aCnquiCbRjFuQ_ezVNN-O-Y68_MaQLPblfaVjgl8xRU" ^
--header "Content-Type: application/json" ^
--header "Accept: audio/wav" ^
--data "{\"text\":\"hello world\"}" ^
--output hello_world.wav ^
"https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize"
 */

routing.post("/synthesize", (req, res) => {
    console.log("audio translation in routing");
    console.log(req.body)
    const fs = require('fs');
    const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');

    const textToSpeech = new TextToSpeechV1({
        iam_apikey: '8aCnquiCbRjFuQ_ezVNN-O-Y68_MaQLPblfaVjgl8xRU',
        // url: 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize'
    });

    const synthesizeParams = {
        text: req.body.text,
        accept: 'audio/mp3',
        voice: req.body.voice,
    };

    let id = req.body.text.replace('?', '').replace(/\s+/g, '').replace('.', ''); // remove punctuation for file naming
    console.log(id);
    textToSpeech.synthesize(synthesizeParams)
        .then(audio => {
            console.log("successful synthesis!"+id)
            audio.pipe(fs.createWriteStream(`./public/app/assets/audio/${id}.mp3`), { flags: 'w', mode: 0666 }); // new file for each translation
            // audio.pipe(fs.createWriteStream(`./public/app/assets/audio/test.mp3`)); // new file for each translation
            res.setHeader('Content-Type', 'text/plain');

            res.send(id);
        })
        .catch(err => {
            console.log('error:', err);
    });
});

module.exports = routing;