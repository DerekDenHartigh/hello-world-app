// Import express module
const express = require("express");

// Add router for userRoutes
// This lets us to split our API routes
// into separate modules (files), so its easier to use
const routing = express.Router();


// accept POST request at URI: /routing
routing.post("https://gateway-wdc.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01", (req, res) => {
    console.log(req.body); // <-- this is the data that has been extracted from the request
res.send(res.translations[0].translation);
});
    // // accept PUT request at URI: /routing
    // routing.put("/translate", (req, res) => {
    // res.send("Updated a user from the database.");
    // });
    //     // accept DELETE request at URI: /routing
    //     routing.delete("/translate", (req, res) => {
    //     res.send("Deleted a user from the database.");
    //     });


 
module.exports = routing;