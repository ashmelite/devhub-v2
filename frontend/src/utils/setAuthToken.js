import axios from 'axios';

//this function will take in token as a parameter
const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;      //set the value of token to global header
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;