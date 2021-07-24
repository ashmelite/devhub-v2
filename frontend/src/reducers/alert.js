//alert.js -> this is a reducer


import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

//if you only pass action (and not state) while calling this function, the state will default to initialState
// eslint-disable-next-line
export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case SET_ALERT:
      return [...state, payload];                             //for any component to use the updated state that this switch-case returns, pass the state as props to that component by using mapStatetoProps
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);     //for each alert object, return the object except the one whose id matches with id in payload, i.e. filter out that element 
    default:
      return state;
  }
}