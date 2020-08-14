import {
  SET_ALBUM,
  ADD_ALBUM,
  LOADING_ALBUM,
  ADD_RATING,
  SET_RATING,
  SET_RATINGS,
  LOADING_RATINGS,
  LOADING_RATING,
  LOADING_REVIEWS,
  SET_REVIEWS,
  SET_ALBUM_ERRORS
} from '../types';

const initialState = {
  album: {},
  albumRatings: [],
  userRating: '',
  reviews: [],
  loading: {
    album: false,
    ratings: false,
    rating: false,
    reviews: false
  },
  errors: {
    album: '',
    ratings: '',
    rating: '',
    reviews: ''
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
      case LOADING_REVIEWS:
        return {
          ...state,
          loading: {
            ...state.loading,
            reviews: true
          }
        };
      case SET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
            loading: {
              ...state.loading,
              reviews: false
            }
        };
      case SET_ALBUM_ERRORS:
        return {
          ...state,
          reviews: [],
            loading: {
              ...state.loading,
              reviews: false
            },
            errors: {
              ...state.errors,
              album: action.payload
            }
        }
        default:
          return state;
  }
}