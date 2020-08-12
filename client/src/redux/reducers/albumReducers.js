import {
  SET_ALBUM,
  ADD_ALBUM,
  LOADING_ALBUM
} from '../types';

const initialState = {
  album: {},
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_ALBUM:
      return {
        ...state,
        loading: true
      };
    case SET_ALBUM:
      return {
        ...state,
        album: action.payload
      };
    case ADD_ALBUM:
      return {
        ...state
      };
    default:
      return state;
  }
}