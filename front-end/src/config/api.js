// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';

export const API_ENDPOINTS = {
  // User endpoints
  CREATE_USER: '/createuser',
  LOGIN: '/login',
  GET_USERS: '/users',
  SEARCH_USER: '/users/search',
  AUTOCOMPLETE: '/users/autocomplete',
  UPDATE_USER: '/updateuser',
  DELETE_USER: '/deleteuser',
  
  // Post endpoints
  CREATE_POST: '/createpost',
  GET_FEED: '/feed',
  GET_POST: '/post',
  UPDATE_POST: '/updatepost',
  DELETE_POST: '/deletepost',
  GET_USER_POSTS: '/posts/user',
};

export default API_BASE_URL;
