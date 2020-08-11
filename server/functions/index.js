const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const {
  db
} = require('./util/admin');

const {
  login,
  signup,
  uploadImage,
  getUserDetails,
  getAuthenticatedUser
} = require('./handlers/users');

const {
  getAllAlbums,
  addOneAlbum
} = require('./handlers/albums');

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.get('/user/:handle', getUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//album routes

exports.api = functions.https.onRequest(app);
app.get('/albums', getAllAlbums);
app.post('/album', addOneAlbum);