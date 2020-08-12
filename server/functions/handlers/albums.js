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
    .get()
    .then(data => {
      let alreadyinDB = false;
      data.forEach(doc => {
        if (doc.data().name === newAlbum.name && doc.data().artist === newAlbum.artist) {
          alreadyinDB = true;
          return response.json({
            message: "Album already in Database"
          })
        }
      })
      if (!alreadyinDB) {
        db.collection('albums')
          .add(newAlbum)
          .then(doc => {
            const responseAlbum = newAlbum;
            responseAlbum.albumId = doc.id;
            response.json(responseAlbum);
          })
      }
    })
    .catch(err => {
      response.status(500).json({
        error: 'Something went wrong!'
      });
      console.error(err);
    })
}