import axios from 'axios'

// ACTION TYPES 

// GET_POSTS

export const GET_POSTS_START = 'GET_POSTS_START'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'

// GET_USER_POSTS

export const GET_USER_POSTS_START = 'GET_USER_POSTS_START'
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS'
export const GET_USER_POSTS_FAILED = 'GET_USER_POSTS_FAILED'

// ADD_POST

export const ADD_POST_START = 'ADD_POST_START'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILED = 'ADD_POST_FAILED'

// UPDATE_POST

export const UPDATE_POST_START = 'UPDATE_POST_START'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const UPDATE_POST_FAILED = 'UPDATE_POST_FAILED'

// DELETE_POST

export const DELETE_POST_START = 'DELETE_POST_START'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED'

// LOGIN/LOGOUT
//-----------------------------------------------------|
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

// REGISTER
//-----------------------------------------------------|
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'

// CLEAR_AUTH_MESSAGES
//-----------------------------------------------------|
export const CLEAR_AUTH_MESSAGES = 'CLEAR_MESSAGES'

// CHECK_LOGGED_IN
//-----------------------------------------------------|
export const CHECK_LOGGED_IN_START = 'CHECK_LOGGED_IN_START'
export const CHECK_LOGGED_IN_SUCCESS = 'CHECK_LOGGED_IN_SUCCESS'
export const CHECK_LOGGED_IN_FAILED = 'CHECK_LOGGED_IN_FAILED'


// ACTION CREATORS
|

// checkLoggedIn - this action pulls in the 'id' & 'token' from local storage & makes GET request to the api to test stored token
// If the token fails- removes the user & resets to a non-logged in state

export const checkLoggedIn = () => {
  return dispatch => {
    dispatch({ type: CHECK_LOGGED_IN_START })

    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

   return axios
      .get(`https://expat-journal-backend-jensen.herokuapp.com/api/users/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        dispatch({ type: CHECK_LOGGED_IN_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: CHECK_LOGGED_IN_FAILED,
          payload: 'Login expired! Please sign in again.'
        })
      })
  }
}


// getPosts - GET Request to grab all posts from the server and stores them in localStorage and in state
export const getPosts = () => {
  return dispatch => {
    dispatch({ type: GET_POSTS_START })

    return axios
      .get('https://expat-journal-backend-jensen.herokuapp.com/api/posts/')
      .then(res => {
        // sort data by most recently created posts
        const payload = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )

        localStorage.setItem('posts', JSON.stringify(payload))

        dispatch({ type: GET_POSTS_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: GET_POSTS_FAILED, payload })
      })
  }
}

// createPost- POST Request to the api with a post obj

export const createPost = post => {
  return dispatch => {
    dispatch({ type: ADD_POST_START })

    const token = localStorage.getItem('token')

    return axios
      .post('https://expat-journal-backend-jensen.herokuapp.com/api/posts/', post, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        getPosts()
        dispatch({ type: ADD_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: ADD_POST_FAILED, payload: err.errorMessage })
      })
  }
}

// editPost - PUT Request to the server to update an item by passing in a post obj with updated values and an id of the post to update

export const editPost = (post, id) => {
  return dispatch => {
    dispatch({ type: UPDATE_POST_START })

    const token = localStorage.getItem('token')

    return axios
      .put(
        `https://expat-journal-backend-jensen.herokuapp.com/api/posts/${id}`,
        post,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({
          type: UPDATE_POST_FAILED,
          payload: err.response.data.error_message
        })
      })
  }
}

// deletePost - DELETE Request - This action to the server to delete a post by id

export const deletePost = id => {
  return dispatch => {
    dispatch({ type: DELETE_POST_START })

    const token = localStorage.getItem('token')

    return axios
      .delete(`https://expat-journal-backend-jensen.herokuapp.com/api/posts/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        dispatch({ type: DELETE_POST_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: DELETE_POST_FAILED, payload: err.errorMessage })
      })
  }
}

// getUserPosts - GET Request - called to update the userPosts stored in state when working in the dashboard

export const getUserPosts = () => {
  return dispatch => {
    dispatch({ type: GET_USER_POSTS_START })
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')

    return axios
      .get(`https://expat-journal-backend-jensen.herokuapp.com/api/users/${id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        // sort user posts by most recent post
        const payload = res.data.posts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )

        dispatch({ type: GET_USER_POSTS_SUCCESS, payload })
      })
      .catch(err => {
        dispatch({
          type: GET_USER_POSTS_FAILED,
          payload: err.response.data.error_message
        })
      })
  }
}

// AUTH ACTION CREATORS

// login  - POST Request

export function login(username, password) {
  return dispatch => {
    dispatch({ type: LOGIN_START })

    return axios
      .post('https://expat-journal-backend-jensen.herokuapp.com/api/auth/login/', {
        username,
        password
      })
      .then(res => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('id', res.data.id)

        const payload = {
          id: res.data.id,
          username: res.data.username
        }

        dispatch({ type: LOGIN_SUCCESS, payload })
      })
      .catch(err => {
        let payload = err
        if (Object.keys(err.response.data).length) {
          payload = err.response.data.errorMessage
        } else {
          payload = 'Please review your login information'
        }
        dispatch({ type: LOGIN_FAILED, payload })
      })
  }
}

// register - POST Request

export function register(username, password, first_name, last_name, email) {
  return dispatch => {
    dispatch({ type: REGISTER_START })

    return axios
      .post('https://expat-journal-backend-jensen.herokuapp.com/api/auth/register', {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email
      })
      .then(res => {
        // store user in localStorage
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('id', res.data.id)

        const payload = {
          username: res.data.username,
          id: res.data.id,
          successMsg: res.statusText
        }
        dispatch({ type: REGISTER_SUCCESS, payload })
      })
      .catch(err => {
        const payload = err.response ? err.response.data : err
        dispatch({ type: REGISTER_FAILED, payload })
      })
  }
}

// clearAuthMsgs- clear login/logout error/success messages that are stored in state

export function clearAuthMsgs() {
  return {
    type: CLEAR_AUTH_MESSAGES
  }
}

// logout - remove user info stored in localStorage to force the login check to fail & isLoggedIn state to false

export function logout() {
  return {
    type: LOGOUT
  }
}
