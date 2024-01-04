const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerJsDocs = YAML.load('./api.yaml');
const rateLimiter = require('./middleware/rateLimiter');

const noteRoute = require('./routes/notes');
const authRoute = require('./routes/auth');
const searchRoute = require('./routes/search');
const authUser = require('./middleware/userAuthentication');

const App = express();
App.use(rateLimiter);
App.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
App.use(express.urlencoded({extended: false}));
App.use(express.json({limit: '50mb'}));
App.use(helmet());
App.use(cors());
App.get('/', (req, res) => {
  res.send('Welcome to server');
});

App.use('/api/auth', authRoute);
App.use('/api/notes', authUser, noteRoute);
App.use('/api/search', authUser, searchRoute);


module.exports = App;
