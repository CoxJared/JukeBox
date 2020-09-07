const {
  admin,
  db
} = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData
} = require('../util/validators');

exports.signup = (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle
  };

  const {
    errors,
    valid
  } = validateSignupData(newUser);

  if (!valid) {
    return response.status(400).json(errors);
  }

  const noImg = 'no-image.png';

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response.status(400).json({
          handle: 'This handle is already taken'
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
          );
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({
        token
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return response.status(400).json({
          email: 'Email is already in use'
        });
      } else {
        return response.status(500).json({
          general: 'Something went wrong, please try again'
        });
      }
    });
};

exports.login = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password
  };

  const {
    errors,
    valid
  } = validateLoginData(user);
  if (!valid) {
    return response.status(400).json(errors);
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((idToken) => {
      return response.json({
        token: idToken
      });
    })
    .catch((err) => {
      return response.status(403).json({
        general: 'wrong credentails, please try again'
      });
    });
};

// upload profile image for user
exports.uploadImage = (request, response) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({
    headers: request.headers
  });
  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return response.status(400).json({
        error: 'Wrong filetype submitted'
      });
    }
    const imageExtension = filename.split('.')[
      filename.split('.').length - 1
    ];
    imageFileName = `${Math.round(
            Math.random() * 10000000000
        )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = {
      filepath,
      mimetype
    };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/users/${request.user.handle}`).update({
          imageUrl
        });
      })
      .then(() => {
        return response.json({
          message: 'Image uploaded successfully'
        });
      })
      .catch((err) => {
        console.error(err);
        return response.status(500).json({
          error: err.code
        });
      });
  });
  busboy.end(request.rawBody);
};

//Get any users details
exports.getUserDetails = (request, response) => {
  let userData = {};
  db.doc(`/users/${request.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection('posts')
          .where('userHandle', '==', request.params.handle)
          .orderBy('createdAt', 'desc')
          .get();
      } else {
        return response.status(404).json({
          error: 'User not found'
        });
      }
    })
    .then((data) => {
      //TODO this is where we can reference reviews for albums
      // userData.posts = [];
      // data.forEach((doc) => {
      //     userData.posts.push({
      //         body: doc.data().body,
      //         createdAt: doc.data().createdAt,
      //         userHandle: doc.data().userHandle,
      //         userImage: doc.data().userImage,
      //         likeCount: doc.data().likeCount,
      //         commentCount: doc.data().commentCount,
      //         postId: doc.id,
      //         plants: doc.data().plants,
      //         image: doc.data().image
      //     });
      // });
      return response.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code
      });
    });
};

exports.getAuthenticatedUser = (request, response) => {
  let userData = {};
  db.doc(`/users/${request.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        // return db
        //   .collection('likes')
        //   .where('userHandle', '==', request.user.handle)
        //   .get();
      }
    })
    .then((data) => {
      // userData.likes = [];
      // data.forEach((doc) => {
      //   userData.likes.push(doc.data());
      // });
      // return db
      //   .collection('notifications')
      //   .where('recipient', '==', request.user.handle)
      //   .orderBy('createdAt', 'desc')
      //   .limit(10)
      //   .get();
    })
    .then((data) => {
      // userData.notifications = [];
      // data.forEach((doc) => {
      //   userData.notifications.push({
      //     recipient: doc.data().recipient,
      //     sender: doc.data().sender,
      //     createdAt: doc.data().createdAt,
      //     postId: doc.data().postId,
      //     type: doc.data().type,
      //     read: doc.data().read,
      //     notificationId: doc.id
      //   });
      // });
      return response.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code
      });
    });
};

//Get any users details
exports.getUserFavAlbums = (request, response) => {
  let albums = [];
  db.collection(`/users/${request.params.handle}/favAlbums`)
    .get()
    .then((data) => {
      if (data.empty) {
        return response.json(albums)
      } else {
        data.forEach( doc => {
          albums.push({
            id: doc.id,
            artist: doc.data().artist,
            name: doc.data().albumName
          })
        })
        return response.json({
          albums: albums
          })
      }
    })
    .catch((err) => {
      console.error(err);
      return response.status(400).json({
        error: err
      });
    });
};
