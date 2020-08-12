import {
  SET_ABLUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  LOADING_UI,
  SET_ALBUM,
  STOP_LOADING_UI,
  SET_ERRORS
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

export const addAlbum = (newAlbum) => (dispatch) => {
  console.log(newAlbum)
  dispatch({
    type: LOADING_UI
  });
  axios.post('/album', newAlbum)
    .then((response) => {
      dispatch({
        type: SET_ALBUM,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};