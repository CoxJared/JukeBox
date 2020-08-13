import {
  SET_ALBUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  ADD_RATING,
  SET_RATING,
  SET_RATINGS
} from '../types';

const initialState = {
  album: {},
  albumRatings: [],
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
        userRating: action.payload
      };
    case SET_RATINGS:
      return {
        ...state,
        albumRatings: action.payload
      }
      case ADD_RATING:
        return {
          ...state
        }
        default:
          return state;
  }
}