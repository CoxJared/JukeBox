import {
  SET_ALBUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  ADD_RATING,
  SET_RATING,
  SET_RATINGS,
  LOADING_RATINGS,
  LOADING_RATING
} from '../types';

const initialState = {
  album: {},
  albumRatings: [],
  userRating: '',
  loading: {
    album: false,
    ratings: false,
    rating: false
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_ALBUM:
      return {
        ...state,
        loading: {
          ...state.loading,
          album: true
        }
      };
    case LOADING_RATINGS:
      return {
        ...state,
        loading: {
          ...state.loading,
          ratings: true
        }
      };
    case LOADING_RATING:
      return {
        ...state,
        loading: {
          ...state.loading,
          rating: true
        }
      };
    case SET_ALBUM:
      return {
        ...state,
        album: action.payload,
          loading: {
            ...state.loading,
            album: false
          }
      };
    case ADD_ALBUM:
      return {
        ...state,
        album: action.payload
      };
    case SET_RATING:
      return {
        ...state,
        userRating: action.payload,
          loading: {
            ...state.loading,
            rating: false
          }
      };
    case SET_RATINGS:
      return {
        ...state,
        albumRatings: action.payload,
          loading: {
            ...state.loading,
            ratings: false
          }
      }
      case ADD_RATING:
        return {
          ...state
        };
      default:
        return state;
  }
}