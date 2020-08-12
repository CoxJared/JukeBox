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

const {
  // getAllRatings,
  addRating
} = require('./handlers/ratings');

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.get('/user/:handle', getUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//album routes
app.get('/albums', getAllAlbums);
app.post('/album', addOneAlbum);

//rating routes
// app.get('/ratings', getAllRatings);
app.post('/:albumId/rating', FBAuth, addRating);

exports.api = functions.https.onRequest(app);