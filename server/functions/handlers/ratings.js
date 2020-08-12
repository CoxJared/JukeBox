const {
  admin,
  db
} = require('../util/admin');

const config = require('../util/config');

exports.addRating = (request, response) => {
  const newRating = {
    value: request.body.value,
    createdAt: new Date().toISOString(),
    albumId: request.params.albumId,
    userHandle: request.user.handle
  };

  const ratingDocument = db.collection('ratings')
    .where('albumId', '==', request.params.albumId)
    .where('userHandle', '==', request.user.handle)
    .limit(1)

  db
    .doc(`/albums/${request.params.albumId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({
          error: 'Album not found'
        });
      } else {
        return ratingDocument.get();
      }
    })
    .then((data) => {
      if (data.empty) {
        return db.collection('ratings').add(newRating);
      } else {
        data.forEach(doc => {
          db.doc(`/ratings/${doc.id}`).update({
            value: newRating.value
          })
        })
      }
    })
    .then(() => {
      response.json({
        value: 'Rating added succefully'
      })
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({
        error: 'Something Went Wrong'
      });
    })
};