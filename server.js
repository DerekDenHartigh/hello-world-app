"use strict";
const require = require("request");

// const watson = require('watson-developer-cloud/language-translator/v3');

// const languageTranslator = new LanguageTranslatorV3({
//     version: '3',
//     iam_apikey: watsonTranslatorCredentials.apikey,
//     url: watsonTranslatorCredentials.url
// });
const express = require('express'); // imports the express module
const router = require("./routing.js"); // imports router from my routing.js file
const app = express(); // creates an express application
app.use(express.json());  // tells the api to serve up data in json
app.use("/", router); // indicates what symbol to route with?
app.use(express.static("./public")); // serves static files from this directory
const port = 3000; // sets port #
app.listen(port, ()=> console.log(`listening on port: http://localhost:${port}`));
// tells server to listen @ specific port # & makes a link in console