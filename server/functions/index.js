const functions = require('firebase-functions');

const app = require('express')();

const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');

const { login, signup } = require('./handlers/users');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

// users routes
app.post('/signup', signup);
// app.post('/login', login);

exports.api = functions.https.onRequest(app);
