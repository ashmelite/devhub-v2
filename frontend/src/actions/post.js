import axios from 'axios'
import { setAlert } from './alert'
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from './types'

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Add a Like
export const addLike = (id) => async dispatch => {          //pass in the post's id to like it
  try {
    const res = await axios.put(`/api/posts/like/${id}`);              //put request since we're updating
    
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }       //send an object with post id and likes   ; id -> post id,  likes -> data that comes back from request
    });
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Remove a Like
export const removeLike = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete a Post
export const deletePost = (id) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    
    dispatch({
      type: DELETE_POST,
      payload: id
    });
    
    dispatch(setAlert('Post Removed', 'success'));
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Add a Post
export const addPost = (formData) => async dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const res = await axios.post('/api/posts', formData, config);
    
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    
    dispatch(setAlert('Post Created', 'success'));
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Get a post
export const getPost = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    
    dispatch({
      type: GET_POST,
      payload: res.data
    });
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Add a Comment
export const addComment = (postId, formData) => async dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
    
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    
    dispatch(setAlert('Comment Added', 'success'));
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// Delete a Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    
    dispatch(setAlert('Comment Removed', 'success'));
    
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}