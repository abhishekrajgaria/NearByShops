const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/admin");
const errorHandler = require("./errorHandler/errorHandler");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Get Nearby Places API",
      version: "1.0.0",
      description: "Given a postcode API will return the list of nearby places",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);


const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.json());


app.use(router);

app.use(errorHandler);

let listner = app.listen(PORT, () => {
  console.log("server listening to port", listner.address().port);
});
