import axios from 'axios';
import { setAlert } from './alert';     //importing alert action
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, CLEAR_PROFILE, RESET_LOADING, CLEAR_POSTS } from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  try {
    const res = await axios.get('/api/auth');
    
    //if response is 200(OK), dispatch the action
    if (localStorage.token) {       //dispatch is wrapped in if statement because if user logs out -> closes the tab -> re-opens the tab using Ctrl+Shift+T, USER_LOADED will get triggered and set the isAutheticated to 'true' that makes dashboard available (which is a protected route) 
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
    
    
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};


//Register the user           //this register function will take in an object having name, email & password as argument
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const body = JSON.stringify({ name, email, password });
  
  try {
    const res = await axios.post('/api/users', body, config);
    
    //if axios response is 200 then dispatch the action
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data   //res.data will be token in this case
    });
    
    dispatch(loadUser());   //this will run USER_LOADED immediately if registration is successful and we will get user data into the state
    
  } catch (err) {
    const errors = err.response.data.errors;
    
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: REGISTER_FAIL
    });
  }
  
};



//Log in the user
export const login = (email, password) => async dispatch => {       //we didn't pass email, password as an object (like in register above) since it's just two fields
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  const body = JSON.stringify({ email, password });
  
  try {
    const res = await axios.post('/api/auth', body, config);
    
    //if axios response is 200 then dispatch the action
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data   //res.data will be token in this case
    });
    
    dispatch(loadUser());
    
  } catch (err) {
    const errors = err.response.data.errors;
    
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: LOGIN_FAIL
    });
  }
  
};


// Logout user / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: LOGOUT });
};

//Reset the 'loading' in profile state to true
export const resetLoading = () => dispatch => {
  dispatch({ type: RESET_LOADING });
};