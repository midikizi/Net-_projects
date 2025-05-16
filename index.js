//imports
const express = require('express');
const bodyParser = require('body-parser');

//intanciate server
const server = express();

//Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello World on my server </h1>');
});

// Importer les routes
const usersRoutes = require('./controlers/usersCtrl');
const articlesRoutes = require('./controlers/articlesCtrl');
const messagesRoutes = require('./controlers/messagesCtrl');

// Configurer les routes
server.use('/api/users', usersRoutes);
server.use('/api/articles', articlesRoutes);
server.use('/api/messages', messagesRoutes);

//launch server
server.listen(8080, function () {
    console.log('Server is up and running on port 8080');
});