import swDocument from './swagger.def'

const express = require("express"),
  http = require("http"),
  swaggerUI = require('swagger-ui-express')
const app = express();

const bodyParser = require("body-parser").json();
const server = http.createServer(app);
const hostname = "0.0.0.0";
const port = 3001;

app.use(bodyParser);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
