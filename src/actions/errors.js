import {
  CREATE_ERROR,
  DELETE_ERROR,
  SIGN_OUT,
}  from '../shared/constants/actions';

export function createError(error) {
  console.log('in create error ' + JSON.stringify(error));
  if (error.status && error.status === 401) {
    return {
      type: SIGN_OUT.SUCCESS,
    };
  }

  const message = error.response ? error.response.statusText : error;

  return {
    type: CREATE_ERROR,
    payload: {
      hasAlert: true,
      message,
    },
  };
}

export function deleteError() {
  return {
    type: DELETE_ERROR,
    payload: { hasAlert: false },
  };
}
