const express = require("express");
const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
const routing = express.Router();
const fetch = require('node-fetch');

routing.post("/translate", (req, res) => {
    console.log(req.body);
    let languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    // iam_apikey: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp', // original key, 20% used
    iam_apikey: '8oaauMYHhzLOFdYP2AAR1bZM4a-HcEqXs70GtjYu7_zv', // new fresh key
    // backup key (fresh 6/27/19): JcXzoQP1a4ULpdu7kL6QDCsBZDbYE61c_OpuQxI9AuBg
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

routing.post("/synthesize", (req, res) => {
    console.log("audio translation in routing");
    let id = req.body.text.replace('?', '').replace(/\s+/g, '').replace('.', ''); // remove punctuation for file naming
    const fs = require("fs");
    if (fs.existsSync(`./public/app/assets/audio/${id}.mp3`)) { // checks to see if the file it is about to make exists, if so, don't call the text-to-speech api
        console.log(id+".mp3 already exists in your assets folder, skipping synthesis")
        let emptyPromise = new Promise(function(resolve, reject) {
            res.send('Synthesis Skipped');
          })
        return emptyPromise;
    } else {
        const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');

        const textToSpeech = new TextToSpeechV1({
            // iam_apikey: '8aCnquiCbRjFuQ_ezVNN-O-Y68_MaQLPblfaVjgl8xRU', // old key, burnt out over 10K char
            iam_apikey: 'cU38E6EMCkjXFwcGwp5ASPL0rN3kNuNUmon7aJGWqIh3', // new fresh key, ~40% used as of 6/27
            // backup key (6/27/19): QhWs56gb6GwBa9q5pTgHorRbFtnKpM3zDDILAzi1tHZC
        });
    
        const synthesizeParams = {
            text: req.body.text,
            accept: 'audio/mp3',
            voice: req.body.voice,
        };

        textToSpeech.synthesize(synthesizeParams)
            .then(audio => {
                console.log("successful synthesis! of "+id+".mp3")
                audio.pipe(fs.createWriteStream(`./public/app/assets/audio/${id}.mp3`), { flags: 'w', mode: 0666 });
                res.send("synthesis complete")
            })
            .catch(err => {
                console.log('error:', err);
        });
    };
});

routing.get("/currency", (req, res) => {
    fetch("http://data.fixer.io/api/latest?access_key=110ff6f7243102e682786013fdcb1620")
    .then( resp => resp.json() )
    .then( response => res.send(response) )
    .catch((error)=>{
        console.error(error);
    })
});

module.exports = routing;