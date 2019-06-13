// Import express module
const express = require("express");

// Add router for userRoutes
// This lets us to split our API routes
// into separate modules (files), so its easier to use
const routing = express.Router();


// respond with "Hello Class!" at URI: /routing
routing.get("/translate", (req, res) => {
res.send("Getting all users from the database.");
});

// respond with "Hello Class!" at URI: /routing
routing.get("/translate/:id", (req, res) => {
console.log(req.params.id);
res.send("Get user for specific id" + req.params.id);
});

// respond with "Hello Class!" at URI: /routing
routing.get("/translate/me", (req, res) => {
res.send("Getting me from the database..");
});


    // accept POST request at URI: /routing
    routing.post("/translate", (req, res) => {
        console.log(req.body); // <-- this is the data that has been extracted from the request
    res.send("Added a new user to the database.");
    });
        // accept PUT request at URI: /routing
        routing.put("/translate", (req, res) => {
        res.send("Updated a user from the database.");
        });
            // accept DELETE request at URI: /routing
            routing.delete("/translate", (req, res) => {
            res.send("Deleted a user from the database.");
            });
    

 
module.exports = routing;