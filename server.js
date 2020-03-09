require('rootpath')();

const express = require('express');
const app = express();

const errorHandler = require('_helpers/error-handler');
// const jwt = require('_helpers/jwt');

const bodyParser = require('body-parser');
const cors = require('cors');

// example for express npm site
// app.get('/', function(req, res) {
//     res.send('Hello world');
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes
app.use('/users', require('./users/user.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port );
});