// require the Express module
const express = require("express");

// require the Router
const routing = require("./translate");

// creates an instance of an Express server
const app = express();

// this express.json function has to be before the app.use("/", userRoutes) in order for it to pull from postman
app.use(express.json());

// use
app.use("/", routing);

// define the port
const port = 3000;

// run the server
app.listen(port, () => console.log(`listening on port: ${port}.`));

