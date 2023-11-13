const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(routes(server));

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`server listening on port http://localhost:${port}`)
})