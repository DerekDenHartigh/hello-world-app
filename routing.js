"use strict";

const express = require("express"); // imports express module
const router = express.Router();  // Router has to be capital

const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  username: 'apikey',
  password: 'NGImZ-apmVBkP_sppstnRF_pPq55FHeIP-tl5y4-fINp',
  url: 'https://gateway.watsonplatform.net/language-translator/api'
//   url: 'https://gateway.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01'
  // https://gateway.watsonplatform.net/language-translator/api ?


});

// PUT



    // router.put("/villainsName", (req, res) => { // updates/alters villain name
    //     let oldName = req.body.character_name;
    //     let newName = req.body.newName;
    //     console.error(oldName, newName);
    //     let sql = `UPDATE earthworm_jim_characters SET character_name = '${newName}' WHERE character_name = '${oldName}';`;
    //     pool.query(sql)
    //     .then((result)=>{
    //         console.log(`Changed ${oldName}'s name to ${newName}`);
    //         res.status(204);
    //         res.send("Name Change Successful!");
    //     })
    //     .catch((error)=>{
    //         console.error(error);
    //     });
    //     });

   
    
module.exports = router;