var express = require('express');
var app = express();

console.log(__dirname)

app.use(express.static(__dirname +'./../../dist/')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/ 