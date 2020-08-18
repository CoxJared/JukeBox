import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  OPEN_LOGIN,
  CLOSE_LOGIN,
  OPEN_SIGNUP,
  CLOSE_SIGNUP
} from '../types';
import axios from 'axios';

export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post('/login', userData)
    .then((response) => {
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch((err) => {
      console.log('hi', err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUserData) => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post('/signup', newUserData)
    .then((response) => {
      setAuthorizationHeader(response.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  console.log('loging out');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED
  });
};

export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  console.log('getting user data');
  axios
    .get('/user')
    .then((response) => {
      dispatch({
        type: SET_USER,
        payload: response.data
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const openLogin = () => (dispatch) => {
  dispatch({
    type: OPEN_LOGIN
  })
}
export const closeLogin = () => (dispatch) => {
  dispatch({
    type: CLOSE_LOGIN
  })
}
export const openSignup = () => (dispatch) => {
  dispatch({
    type: OPEN_SIGNUP
  })
}
export const closeSignup = () => (dispatch) => {
  dispatch({
    type: CLOSE_SIGNUP
  })
}