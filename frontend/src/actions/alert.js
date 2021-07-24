//alert.js -> this is an actions file, here we can dispatch some actions 


import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

/*this setAlert action can be called from the component; depending on the type sent in dispatch which is 'SET_ALERT' here, 
  the switch-case SET_ALERT in 'alert reducer' will add (copy) the alert to the state and return that particular state which then will get passed down to the component (as a prop) that called it.
  So, that's how you pass down state as props to the components */
export const setAlert = (msg, alertType, timeout = 4000) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  
};