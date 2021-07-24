import { ADD_POST, CLEAR_POSTS, DELETE_POST, GET_POSTS, GET_POST, POST_ERROR, UPDATE_LIKES, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  pinged: false,
  error: {}
}

// eslint-disable-next-line
export default function(state = initialState, action) {
  const {type, payload} = action;
  
  switch(type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        pinged: false
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        pinged: true
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],       // ...state.posts makes a copy of current state and add to that whatever comes through payload and since posts are contained in an array so we've used []; Also, putting payload in front so that in our UI, when we add a post it comes on top
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),        //return each(all) post where post id doesn't match the one in payload since the post whose id matches the payload got deleted
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),            //see article 11.3 @ 4:00
        loading: false
      }
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        post: null,
        loading: true
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },      //see article 11.7 @ 04:35
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload )     //this payload is a comment id
        },
        loading: false
      }
    default:
      return state;
  }
}