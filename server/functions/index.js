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
  addOneAlbum,
  addRating,
  getOneAlbum,
  getAlbumRatings,
  getUserAlbumRating,
  getAllReviews
} = require('./handlers/albums');


// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.get('/user/:handle', getUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//album routes
app.get('/albums', getAllAlbums);
app.post('/album', addOneAlbum);
app.get('/album/:artist/:name', getOneAlbum);

app.post('/album/:artist/:name/rating', FBAuth, addRating);
app.get('/album/:artist/:name/ratings', getAlbumRatings);
app.get('/album/:artist/:name/rating/:user', getUserAlbumRating);

app.get('/reviews', getAllReviews);

exports.api = functions.https.onRequest(app);