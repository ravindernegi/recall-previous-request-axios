require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const port = process.env.PORT || 3000;
const {  checkAuth } = require('./src/helpers/common');
const   connectToDatabase  = require('./src/helpers/db');
const errorHandler = require("./src/helpers/error_handler");
const AuthRoute = require("./src/routes/auth");
const UserRoute = require("./src/routes/user");
const apiBase = process.env.BASE_PATH || "/api/v1";
connectToDatabase({}, (error) => {});
const app = express();
// Access Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//allow cors
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// allow api code file
app.use(express.static('public'));


// define a simple route
app.use(apiBase + '/auth', AuthRoute);

// define middleware for authentication
app.use(checkAuth);

app.use(apiBase + '/users', UserRoute);


// handle errors
// global error handler
app.use(errorHandler);
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
