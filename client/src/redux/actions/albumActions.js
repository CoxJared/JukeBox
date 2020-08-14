import {
  SET_ABLUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  LOADING_UI,
  SET_ALBUM,
  STOP_LOADING_UI,
  SET_ERRORS,
  SET_RATING,
  SET_RATINGS,
  LOADING_RATING,
  LOADING_RATINGS,
  LOADING_REVIEWS,
  SET_REVIEWS,
  SET_ALBUM_ERRORS
} from '../types';
import axios from 'axios';

export const getAlbum = (album) => (dispatch) => {
  dispatch({
    type: LOADING_ALBUM
  });
  axios.get(`album/${album.artist}/${album.name}`)
    .then(response => {
      dispatch({
        type: SET_ALBUM,
        payload: response.data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(err => console.log(err));
};

export const getAlbumRatings = (album) => (dispatch) => {
  dispatch({
    type: LOADING_RATINGS
  });
  axios.get(`album/${album.artist}/${album.name}/ratings`)
    .then(response => {
      dispatch({
        type: SET_RATINGS,
        payload: response.data
      })
    })
}

export const addAlbum = (newAlbum) => (dispatch) => {
  // dispatch({
  //   type: LOADING_ALBUM
  // });
  axios.post('/album', newAlbum)
    .then((response) => {
      dispatch({
        type: SET_ALBUM,
        payload: response.data
      })
    })
    .catch(err => {
      console.error(err);
    });
};

export const setAlbum = (album) => (dispatch) => {
  dispatch({
    type: SET_ALBUM,
    payloading: album
  })
};

export const addRating = (albumRating) => (dispatch) => {
  dispatch({
    type: LOADING_RATING
  });
  axios.post('/album/rating', albumRating)
    .then((response) => {
      dispatch({
        type: SET_RATING,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const getUserAlbumRating = (album, userHandle) => (dispatch) => {
  dispatch({
    type: LOADING_RATING
  });
  axios.get(`/album/${album.artist}/${album.name}/rating/${userHandle}`)
    .then((response) => {
      dispatch({
        type: SET_RATING,
        payload: response.data
      })
    })
    .catch(err => {
      console.error(err);
      // dispatch({
      //   type: SET_ERRORS,
      //   payload: err.response.data
      // })
    })
}

export const submitUserAlbumRating = (album, value) => (dispatch) => {
  dispatch({
    type: LOADING_RATING
  });
  axios.post(`/album/${album.artist}/${album.name}/rating`, {
      value
    })
    .then((response) => {
      dispatch({
        type: SET_RATING,
        payload: response.data
      })
      getAlbumRatings(album);
    })
    .catch(err => {
      console.error(err)
    })
}

export const getAlbumReviews = (album) => (dispatch) => {
  dispatch({
    type: LOADING_REVIEWS
  });
  axios.get(`/album/${album.artist}/${album.name}/reviews`)
    .then((response) => {
      dispatch({
        type: SET_REVIEWS,
        payload: response.data.reviews
      })
    })
    .catch(err => {
      console.error(err)
      dispatch({
        type: SET_ALBUM_ERRORS,
        payload: err.response.data
      })
    })
}