const express = require("express");
const routing = require("./routing.js");
const app = express();
app.use(express.json());
app.use("/", routing);
app.use(express.static("./public"));
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`listening on port: http://localhost:${port}`));