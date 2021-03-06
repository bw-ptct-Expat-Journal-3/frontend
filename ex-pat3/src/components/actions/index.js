import axios from 'axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

export const URL = 'https://expat-journal-backend-jensen.herokuapp.com'

export const login = creds => dispatch => {
  dispatch({ type: LOGIN_START })
  return axios
    .post(`api/auth/login`, creds)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
      localStorage.setItem('token', res.data.token)
      const saved = JSON.stringify(res.data)
      localStorage.setItem('data', saved)
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED, payload: err })
    })
}

export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

export const register = creds => dispatch => {
  dispatch({ type: REGISTER_START })
  return axios
    .post(`api/auth/register`, creds)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      dispatch({ type: REGISTER_SUCCESS })
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAILED, payload: err })
      alert('Something is wrong, please try again')
    })
}

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
  localStorage.removeItem('token')
  localStorage.removeItem('data')
  dispatch({ type: LOGOUT_SUCCESS })
  window.location.reload()
}

export const FETCHING_DATA = 'FETCHING_DATA'
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS'

export const getData = data => dispatch => {
  dispatch({ type: FETCHING_DATA, payload: data })
  dispatch({ type: FETCHING_DATA_SUCCESS })
}

export const UPDATE_USER_START = 'UPDATE_USER_START'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

export const updateUser = (newUser, token) => dispatch => {
  dispatch({ type: UPDATE_USER_START })
  return axios
    .put(`api/users/:id`, newUser, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
      localStorage.setItem('data', JSON.stringify(res.data))
    })
    .catch(err => {
      dispatch({ type: UPDATE_USER_FAILED, payload: err.response })
      alert('Something is wrong, please try again')
    })
}

export const ADD_POST_START = 'ADD_POST_START'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILED = 'ADD_POST_FAILED'

export const addPost = (newPost, id, token) => dispatch => {
  dispatch({ type: ADD_POST_START })
  return axios
    .post(`api/post/:id`, newPost, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: ADD_POST_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: ADD_POST_FAILED, payload: err.response })
      alert('Something is wrong, please try again')
    })
}

export const DELETE_POST_START = 'DELETE_POST_START'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'

export const deletePost = (userId, postId, token) => dispatch => {
  dispatch({ type: DELETE_POST_START })
  return axios
    .delete(`api/posts/:id`, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: DELETE_POST_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: DELETE_POST_FAILED, payload: err.response })
      alert('Failed to delete post, please try again')
    })
}

export const UPDATE_POST_START = 'UPDATE_POST_START'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED'

export const updatePost = (userId, post, token) => dispatch => {
  const user = localStorage.getItem('data')
  dispatch({ type: UPDATE_POST_START })
  return axios
    .put(`api/posts/:id`, post, {
      headers: { Authorization: token }
    })
    .then(res => {
      dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: UPDATE_POST_FAILED, payload: err.response })
      alert('Something is wrong, please try again')
    })
}
