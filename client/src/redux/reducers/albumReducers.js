import {
  SET_ALBUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  ADD_RATING,
  SET_RATING

} from '../types';

const initialState = {
  album: {},
  userRating: '',
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
        ...state,
        album: action.payload
      };
    case SET_RATING:
      return {
        ...state,
        rating: action.payload
      };
    case ADD_RATING:
      return {
        ...state
      }
      default:
        return state;
  }
}