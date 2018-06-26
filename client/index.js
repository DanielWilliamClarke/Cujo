var express = require('express');
var { createApolloFetch } = require("apollo-fetch");


var app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/')); //serves the index.html

app.get("/cvdata", (req, res) => {
  /* it appears that when client(server) and server(server) containers are in
  a network (networks: server) then the internal exposed port should be used to connect,
  not the exposed external port of the container as prescribed in docker-compose */
  const uri = 'http://server/';

  const query = `
    query {
      GetAbout {
        about
      }
    }
  `

  const apolloFetch = createApolloFetch({ uri });

  apolloFetch({ query }).then(result => {
    const { data, errors } = result;
    if(errors && errors.length) {
      console.log(errors);
      res.send(null);
    } else {
      res.send(data);
    }
  }).catch(error  => {
    console.log(error);
  });
  
});

app.listen(port, () => {
  console.log("listening on port: " + port);
}); //listens on port 3000 -> http://localhost:3000/