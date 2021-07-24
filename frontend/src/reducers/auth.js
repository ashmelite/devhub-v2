import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, DELETE_ACCOUNT } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload         //payload incudes the user i.e. name, email, avatar excluding password, since we hit backend route 'api/auth' through axios and got user back as a response
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
    case AUTH_ERROR:                         //all four of these cases will do the same thing i.e. clear the auth State, set token to null, etc.
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}