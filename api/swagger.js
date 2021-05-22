const swaggerJSDoc = require('swagger-jsdoc');
const host = process.env.API_HOST || 'localhost';
const port = process.env.PORT || 3000;
const apiBase = process.env.BASE_PATH || "/api/v1";
const swaggerDefinition = {
    info: {
        title: 'Demo App Api', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'Demo App Api', // short description of the app
      },
      host: host+':'+port, // the host or url of the app
      basePath: apiBase, // the basepath of your endpoint,
      "schemes": [

          "http",

          "https"

          ],
      securityDefinitions :{
          AUTHORIZATION:{
              name: "AUTHORIZATION",
              type: 'apiKey',
              required: 'true',
              in: "header"  ,
            }
        }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions

  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);