import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, GET_PROFILES, CLEAR_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, GET_REPOS, RESET_PINGED2, VIEW_PROFILE } from './types';

//Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  
  try {
    const res = await axios.get('/api/profile/me');
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data       //put the data into state
    });
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


//Get all profiles
export const getProfiles = () => async dispatch => {
  
  //dispatch({ type: CLEAR_PROFILE });        //to clear previous user's profile state;  EDIT: Removed it since it clears the profiles state every time it runs and when we switch between routes, fetches data from backend every single time that makes the website slow (i.e. more loading spinner animation)
  dispatch({ type: RESET_PINGED2 });          //instead run this
  
  try {
    const res = await axios.get('/api/profile');
    
    dispatch({
      type: GET_PROFILES,
      payload: res.data       //put the data into state
    });
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


//Get profile by ID (user's id not profile's id)
export const getProfileById = (userId) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    
    dispatch({
      type: VIEW_PROFILE,
      payload: res.data       //put the data into state
    });
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


//Get Github repos
export const getGithubRepos = (username) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    
    dispatch({
      type: GET_REPOS,
      payload: res.data       //put the data into state
    });
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


//Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const res = await axios.post('/api/profile', formData, config);
    
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert(edit ? 'Profile Updated!' : 'Profile Created!', 'success'));
    
    if(!edit) {
      history.push('/dashboard');
    }
    
  } catch (err) {
    
    const errors = err.response.data.errors;
    
    if(errors) {       //validation check (loop through errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const res = await axios.put('/api/profile/experience', formData, config);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Experience added!', 'success'));
    
    history.push('/dashboard');     //redirect afterwards
    
  } catch (err) {
    
    const errors = err.response.data.errors;
    
    if(errors) {       //validation check (loop through errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    const res = await axios.put('/api/profile/education', formData, config);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Education added!', 'success'));
    
    history.push('/dashboard');     //redirect afterwards
    
  } catch (err) {
    
    const errors = err.response.data.errors;
    
    if(errors) {       //validation check (loop through errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }      //if error occurs, send this payload object into the State
    });
  }
}


// Delete experience
                            //take in id as parameter
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Experience Removed!', 'success'));
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete education

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    
    dispatch(setAlert('Education Removed!', 'success'));
    
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}


//Delete Account & Profile

export const deleteAccount = () => async dispatch => {
  
  if(window.confirm('Are you sure? This can not be undone!')) {
    
    try {
      await axios.delete('/api/profile');
      
      dispatch({
        type: CLEAR_PROFILE
      });
      
      dispatch({
        type: DELETE_ACCOUNT
      });
      
      dispatch(setAlert('Your Account has been permanently deleted!'));
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
    
  }
   
}