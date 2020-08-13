const {
  admin,
  db
} = require('../util/admin');

const config = require('../util/config');

exports.getAllAlbums = (request, response) => {
  db
    .collection('albums')
    .get()
    .then(data => {
      let albums = [];
      data.forEach(doc => {
        albums.push({
          albumId: doc.id,
          name: doc.data().name,
          artist: doc.data().artist
        })
      })
      return response.json(albums);
    })
    .catch(err => {
      console.error(err);
      return response.status(400).json({
        error: err
      })
    })
}

exports.addOneAlbum = (request, response) => {
  const newAlbum = {
    name: request.body.name,
    artist: request.body.artist,
    image: request.body.image,
    createdAt: new Date().toISOString(),
    mbid: request.body.mbid,
    ratingCount: 0,
    reviewCount: 0,
  }

  db.collection('albums')
    .where('artist', '==', request.body.artist)
    .where('name', '==', request.body.name)
    .get()
    .then(data => {
      if (!data.empty) {
        data.forEach(doc => {
          return response.json({
            id: doc.id,
            name: doc.data().name,
            artist: doc.data().artist,
            image: doc.data().image,
            createdAt: doc.data().createdAt,
            mbid: doc.data().mbid,
            ratingCount: doc.data().ratingCount,
            reviewCount: doc.data().reviewCount,
          });
        })
      } else {
        return db.collection('albums')
          .add(newAlbum)

      }
    })
    .then(doc => {
      const responseAlbum = newAlbum;
      responseAlbum.albumId = doc.id;
      response.json(responseAlbum);
    })
    .catch(err => {
      response.status(500).json({
        error: 'Something went wrong!'
      });
      console.error(err);
    })
}

exports.getOneAlbum = (request, response) => {
  const album = {
    name: request.params.name,
    artist: request.params.artist
  }
  console.log(album);
  db.collection('albums')
    .where('name', '==', album.name)
    .where('artist', '==', album.artist)
    .limit(1)
    .get()
    .then(data => {
      if (data.empty) {
        return response.status(404).json({
          error: 'No info found on this album'
        })
      } else {
        data.forEach(doc => {
          album.id = doc.id
          album.createdAt = doc.data().createdAt
          album.image = doc.data().image
          album.mbid = doc.data().mbid
          album.ratingCount = doc.data().ratingCount
          album.reviewCount = doc.data().reviewCount
        })
        return db.collection('ratings')
          .where('albumId', '==', album.id)
          .get()
      }
    })
    .then(data => {
      album.ratings = []
      data.forEach(doc => {
        album.ratings.push({
          id: doc.id,
          value: doc.data().value,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle
        })
      })
      return response.json(album);
    })
    .catch(err => {
      console.error(err);
      return response.status(400).json({
        error: err
      })
    })
  //TODO add reviews when that is added
}


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
    .collection('albums')
    .where('name', '==', request.body.album.name)
    .where('artist', '==', request.body.album.artist)
    .get()
    .then((doc) => {
      if (doc.empty) {
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
      response.json(
        newRating)
    })
    .catch(err => {
      console.log(err);
      response.status(500).json({
        error: 'Something Went Wrong'
      });
    })
};

exports.getAlbumRatings = (request, response) => {

  let ratings = [];
  let albumId;

  db.collection('albums')
    .where('artist', '==', request.params.artist)
    .where('name', '==', request.params.name)
    .get()
    .then((data) => {
      if (data.empty) {
        return response.status(404).json({
          error: 'Album not found'
        });
      } else {
        data.forEach((doc) => {
          albumId = doc.id
        })
        return db.collection('ratings')
          .where('albumId', '==', albumId)
          .get()
      }
    })
    .then(data => {
      if (data.empty) {
        return response.json({
          ratings: ratings
        })
      } else {
        data.forEach(doc => {
          ratings.push({
            id: doc.id,
            albumId: doc.data().albumId,
            createdAt: doc.data().createdAt,
            userHandle: doc.data().userHandle,
            value: doc.data().value
          })
        })
        return response.json({
          ratings: ratings
        })
      }
    })
    .catch(err => {
      console.error(err);
      return response.status(400).json({
        error: err
      })
    })
}

exports.getUserAlbumRating = (request, response) => {
  const rating = {
    id: '',
    albumId: '',
    createdAt: '',
    userHandle: '',
    value: ''
  };

  db.collection('albums')
    .where('artist', '==', request.params.artist)
    .where('name', '==', request.params.name)
    .get()
    .then((data) => {
      if (data.empty) {
        return response.status(404).json({
          error: 'Album not found'
        });
      } else {
        data.forEach((doc) => {
          albumId = doc.id
        })
        return db.collection('ratings')
          .where('albumId', '==', albumId)
          .where('userHandle', '==', request.params.user)
          .get()
      }
    })
    .then(data => {
      if (data.empty) {
        return response.json(rating)
      } else {
        data.forEach(doc => {
          rating = {
            id: doc.id,
            albumId: doc.data().albumId,
            createdAt: doc.data().createdAt,
            userHandle: doc.data().userHandle,
            value: doc.data().value
          }
        })
        return response.json(rating)
      }
    })
    .catch(err => {
      console.error(err);
      return response.status(400).json({
        error: err
      })
    })
}