import { browserHistory } from 'react-router';
import auth0 from 'auth0-js';
import { axios } from '../shared/utilities';
import { AUTH, SIGN_OUT, PROFILE } from '../shared/constants/actions';
import { AUTHOR_PATH } from '../shared/constants/apis';
import store from '../store';

//configure auth0
const webAuth = new auth0.WebAuth({
  clientID: 'ICz2gh633mo05wuaONGZuS3L2byNvPkw',
  domain: 'anbercin.eu.auth0.com',
  responseType: 'token id_token',

});

webAuth.parseHash(window.location.hash, (err, authResult) => {

  if (err) store.dispatch(authFailure(err.description));
  if (authResult && authResult.accessToken && authResult.idToken) {
    store.dispatch(authSuccess(authResult.accessToken, authResult.idToken));

    webAuth.client.userInfo(authResult.accessToken, (error, profile) => {
      console.log('in profile :' + JSON.stringify(profile));
      if (error) {
        console.log('Error loading the Profile', error);

      } else {
        store.dispatch(profileSuccess(profile));
      }
    });
  }

});

function authSuccess(accessToken, idToken) {
  console.log('auth success');
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('id_token', idToken);
  return { type: AUTH.SUCCESS };

}

function authFailure(errorMessage) {
  console.log('auth FAILURE: ' + errorMessage);
  return {
    type: AUTH.FAILURE,
    payload: { errorMessage },
  };
}

function profileSuccess(profile) {
  console.log('profile success');
  localStorage.setItem('profile', JSON.stringify(profile));
  return {
    type: PROFILE.SUCCESS,
    payload: { profile },
  };
}

export function signUp(params) {
  const request = axios.post(`${AUTHOR_PATH}/sign-up`, params);
  return dispatch => {
    return (
      request
        .then(response => dispatch(authSuccess(response.data.accessToken)))
        .catch(error => dispatch(authFailure(error.data)))
    );
  };
}

export function signIn(email, password) {
  return dispatch => {
    webAuth.redirect.loginWithCredentials({
        connection: 'Username-Password-Authentication',
        email,
        password,
      }, err => {
        if (err) dispatch(authFailure(err.description));
      });
  };
  /*
  //const request = axios.post(`${AUTHOR_PATH}/sign-in`, params);
  const request = axios.get('http://rim.mkk.com.tr:5000/students');

  return dispatch => {
    return (
      request
        .then(response => dispatch(authSuccess(response.data.accessToken)))
        .then(() => browserHistory.push('/cms'))
        .catch(error => dispatch(authFailure(error.data)))
    );
  };
  */
}

function signOutSuccess() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('id_token');
  localStorage.removeItem('profile');
  return {
    type: SIGN_OUT.SUCCESS,
  };
}

function signOutFailure({ errorMessage }) {
  return {
    type: SIGN_OUT.FAILURE,
    payload: { errorMessage },
  };
}

export function signOut() {
  return dispatch => {
    dispatch(signOutSuccess());
    browserHistory.push('/login');
  };
  /*
  const request = axios.delete(`${AUTHOR_PATH}/sign-out`);
  return dispatch => {
    return (
      request
        .then(() => dispatch(signOutSuccess()))
        .then(() => browserHistory.push('/login'))
        .catch(error => dispatch(signOutFailure(error.data)))
    );
  };
  */
}
