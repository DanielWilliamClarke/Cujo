var express = require('express');
var app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.send('HIT THE SERVER!')); 
app.get("/dev", (req, res) => res.send('HIT THE DEV SERVER!')); 

app.listen(port, () => {
  console.log("Server listening on port: " + port);
});