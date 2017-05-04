import decode from 'jwt-decode';
import { AUTH, SIGN_OUT, PROFILE } from '../shared/constants/actions';

function checkTokenExpiry() {
  let jwt = localStorage.getItem('id_token');
  if (jwt) {
    let jwtExp = decode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if (new Date() < expiryDate) {
      console.log('token is valid');
      return true;
    }
  }
  console.log('token has expired');
  return false;
}

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

const INITIAL_STATE = {
  errorMessage: '',
  authenticated: checkTokenExpiry(),
  profile: getProfile(),
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case AUTH.SUCCESS:
      return { ...state, errorMessage: '', authenticated: true, profile: null };

    case PROFILE.SUCCESS:
      return { ...state, errorMessage: '', authenticated: true, profile: action.payload.profile };

    case SIGN_OUT.SUCCESS:
      return { ...state, errorMessage: '', authenticated: false, profile: null };

    case AUTH.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage, profile: null };

    default:
      return state;
  }
}
