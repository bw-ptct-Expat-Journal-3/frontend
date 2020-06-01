import React, {Component} from 'react'
import { connect } from 'react-redux'
import URL from '../actions'
import PrivateRoute from './PrivateRoute'
import Post from "./Post";
import AddPostForm from "./AddPostForm";
import axios from 'axios'
import PostCard from './PostCard'
import Loader from 'react-loader-spinner'
import '../styles/posts.css'

class DashBoard extends Component {
  state = {
    posts: [],
    error: '',
    fetching: false,
    searchTerm: ''
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('data'))
    const token = localStorage.getItem('token')
    if (data.role === 'admin') {
      //GET to all user posts
      axios
        .get(
          `/api/users/:id/posts`,
          {
            headers: {
              Authorization: `token`
            }
          },
          this.setState({
            fetching: true
          })
        )
        .then(res => {
          this.setState({
            posts: res.data,
            fetching: false
          })
        })
        .catch(err => {
          this.setState({
            error: err
          })
        })
    } else {
      axios
        .get(
          `/api/posts/:id`,
          {
            headers: {
              Authorization: token
            }
          },
          this.setState({
            fetching: true
          })
        )
        .then(res => {
          this.setState({
            posts: res.data,
            fetching: false
          })
        })
        .catch(err => {
          this.setState({
            error: err
          })
        })
    }
  }

  updateSearch = e => {
    this.setState({ [e.target.name]: e.target.value.substr(0, 20) })
  }

  render() {
    const data = JSON.parse(localStorage.getItem('data'))
    let searchedPosts = this.state.posts.filter(post => {
      if (
        post.name
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) > -1
      ) {
        return post
      } else if (
        post.status
          .toLowerCase()
          .indexOf(this.state.searchTerm.toLowerCase()) > -1
      ) {
        return post
      } else {
        return null
      }
    })
    return
      <div className="container">
        <h1>User Dashboard</h1>
        <input
          id="search"
          type="text"
          name="searchTerm"
          placeholder="Search posts by name..."
          onChange={this.updateSearch}
          value={this.state.searchTerm}
        />

        {!this.state.fetching ? (
          <div className="postlist">
            {searchedPosts.map((post, i) => (
              <PostCard key={i} card={post} user={data} />
            ))}
          </div>
        ) : (
          <Loader type="Ball-Triangle" color="#bb1333" height="90" width="60" />
        )};
      </div>
  }
}

export default DashBoard
