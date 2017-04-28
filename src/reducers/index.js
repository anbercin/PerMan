import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import about from './abouts';
import posts from './employeesReducer';
import auth from './auths';

const rootReducer = combineReducers({
    about,
    form,
    posts,
    auth,
  });

export default rootReducer;
