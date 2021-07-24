import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS, RESET_LOADING, RESET_PINGED2, VIEW_PROFILE } from "../actions/types";

const initialState = {        //these all are our states
  profile: null,
  viewprofile: null,
  profiles: [],
  repos: [],
  loading: true,
  pinged: false,
  pinged2: false,
  error: {}       //error object for any errors in the request
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,       //current State
        profile: payload,     //set profile to whatever comes in through payload from the dispatched action in 'profile action'
        loading: false
      }
    case VIEW_PROFILE:
      return {
        ...state,
        viewprofile: payload,
        pinged2: true
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,             //fill profiles [] empty array with all users profiles,
        loading: false,
        pinged: true 
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    case GET_REPOS:
      return {
        ...state,
        repos: payload,      //fill repos state with payload
        loading: false
      }
    case RESET_LOADING:
      return {
        ...state,
        loading: true
      }
    case RESET_PINGED2:
      return {
        ...state,
        pinged2: false
      }
    default:
      return state;
  }
}