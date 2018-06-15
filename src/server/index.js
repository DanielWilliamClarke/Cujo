var express = require('express');
var app = express();

console.log(__dirname)

const port = process.env.PORT || 3000;

app.use(express.static(__dirname +'./../../dist/')); //serves the index.html
app.listen(port); //listens on port 3000 -> http://localhost:3000/ 