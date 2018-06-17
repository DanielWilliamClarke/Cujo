var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/')); //serves the index.html
app.listen(port, () => {
  console.log("listening on port: " + port);
}); //listens on port 3000 -> http://localhost:3000/