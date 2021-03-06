import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  OPEN_LOGIN,
  CLOSE_LOGIN,
  OPEN_SIGNUP,
  CLOSE_SIGNUP
  // LIKE_POST,
  // UNLIKE_POST,
  // MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  loginOpen: false,
  signupOpen: false,
  credentials: {},
  API_KEY: process.env.REACT_APP_LASTFM_API_KEY
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
          loading: false,
          ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case OPEN_LOGIN:
      return {
        ...state,
        loginOpen: true
      }
      case CLOSE_LOGIN:
        return {
          ...state,
          loginOpen: false
        };
      case OPEN_SIGNUP:
        return {
          ...state,
          signupOpen: true
        };
      case CLOSE_SIGNUP:
        return {
          ...state,
          signupOpen: false
        };
      default:
        return state;

  }
}