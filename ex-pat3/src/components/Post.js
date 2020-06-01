import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import axios from 'axios'
import '../styles/singlepost.css'
import { URL, deletePost, updatePost } from '../actions'
import moment from 'moment'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      post: {},
      newLink: false,
      linkForm: {
        link_type: '',
        link_href: ''
      }
    }
  }

  componentDidMount() {
    this.setState({ post: this.props.location.state.card })
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('data'))
    const postId = this.props.match.params.id
    axios
        .get(
            `api/posts/${
                this.props.location.state.card.user_id
            }/${postId}`,
            {
              headers: {
                Authorization: token
              }
            }
        )
        .then(res => {
          this.setState({
            project: {
              ...this.state.post,
              comments: res.data.comments,
              links: res.data.links
            }
          })
        })
        .catch(err => {
          alert('Something is wrong, please try again.')
        })
  }

  changeHandler = e => {
    this.setState({
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }

  deletePost = (userId, postId, token) => {
    this.props.deletePost(userId, postId, token).then(() => {
      this.props.history.push('/dashboard')
    })
  }

  editHandler = () => {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  updateCheck = () => {
    return !(!this.state.post.updated_at ||
        this.state.post.created_at === this.state.post.updated_at);
  }

  updatePost = e => {
    const token = localStorage.getItem('token')
    const newPost = {
      name: this.state.post.name,
      description: this.state.post.description,
      status: this.state.post.status,
      id: this.state.post.id || this.state.post.post_id
    }
    e.preventDefault()
    this.props.updatePost(this.state.post.user_id, newPost, token)
    this.setState({
      disabled: true
    })
  }

  linkChange = e => {
    this.setState({
      linkForm: {
        ...this.state.linkForm,
        [e.target.name]: e.target.value
      }
    })
  }

  addLink = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(
          `api/posts/${this.props.match.params.id}/links`,
          this.state.linkForm,
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
      )
      this.setState({
        newLink: false,
        disabled: true,
        project: {
          ...this.state.post,
          links: res.data
        },
        linkForm: {
          link_type: '',
          link_href: ''
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem('data'))
    const token = localStorage.getItem('token')
    return (
        <div className="singlepost">
          <fieldset disabled={this.state.disabled}>
            <form onSubmit={this.updatePost}>
              <p
                  className={`${this.state.disabled ? 'edit' : 'cancel'}`}
                  onClick={() => this.editHandler()}
              >
                {this.state.disabled ? 'EDIT' : 'CANCEL'}
              </p>
              {user.role === 'admin' ? (
                  <p
                      onClick={() => {
                        if (
                            window.confirm(
                                'Are you sure you wish to delete this post?'
                            )
                        )
                          this.deletePost(
                              this.state.post.user_id,
                              this.state.post.id,
                              token
                          )
                      }}
                      className="delete"
                  >
                    DELETE
                  </p>
              ) : (
                  <p
                      onClick={() => {
                        if (
                            window.confirm(
                                'Are you sure you wish to delete this post?'
                            )
                        )
                          this.deletePost(
                              this.state.post.user_id,
                              this.state.post.post_id,
                              token
                          )
                      }}
                      className="delete"
                  >
                    DELETE
                  </p>
              )}
              <h2>{this.state.post.name}</h2>

              <h6 htmlFor="submittedBy">
                {this.state.post.first_name} {this.state.post.last_name},{' '}
              </h6>

              <span>Email: {this.state.post.email}</span>

              <span>
              {' '}
                Created:{' '}
                {moment(
                    this.state.post.created_at,
                    'YYYY-MM-DDTkk:mm:ss.SSSZ'
                ).format('M/D/YY hh:mm A')}
                {this.updateCheck()
                    ? ` | Updated: ${moment(
                        this.state.post.updated_at,
                        'YYYY-MM-DDTkk:mm:ss.SSSZ'
                    ).format('M/D/YY hh:mm A')}`
                    : null}
            </span>

              <label htmlFor="status"> Status:</label>
              <select
                  id="status"
                  name="status"
                  disabled={this.state.disabled}
                  value={this.state.post.status}
                  onChange={this.changeHandler}
                  className={`status ${this.state.post.status}`}
              >
                <option defaultValue>Pending</option>
                {user.role === 'admin' ? (
                    <option className="Approved">Approved</option>
                ) : null}
                {user.role === 'admin' ? (
                    <option className="Denied">Denied</option>
                ) : null}
                {user.role === 'admin' ? (
                    <option className="Working">Working</option>
                ) : null}
                {user.role === 'admin' ? (
                    <option className="Feedback">Feedback</option>
                ) : null}
                <option className="Complete">Complete</option>
              </select>

              <label htmlFor="description"> Description:</label>
              <textarea
                  className="description"
                  type="text"
                  id="description"
                  name="description"
                  onChange={this.changeHandler}
                  value={this.state.post.description}
                  disabled={this.state.disabled}
              />
              {this.state.disabled ? null : <button type="submit">Submit</button>}
            </form>
          </fieldset>
          <div>
            <h4> Post Links </h4>
            {!this.state.disabled ? (
                <button
                    className="add-link"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ newLink: !this.state.newLink })
                    }}
                >
                  {!this.state.newLink ? 'Add New Link' : 'Cancel'}
                </button>
            ) : null}
            {this.state.post.links &&
            this.state.post.links.map(link => (
                <div key={link.id}>
                  <strong>{link.link_type}: </strong>
                  <a
                      href={link.link_href}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    {link.link_href}
                  </a>
                </div>
            ))}
            {this.state.newLink && (
                <form onSubmit={this.addLink} className="link-form">
                  <div className="newlink">
                    {user.role === 'admin' ? (
                        <select
                            name="link_type"
                            value={this.state.linkForm.link_type}
                            onChange={this.linkChange}
                        >
                          <option>Select Type</option>
                          <option></option>
                          <option></option>
                        </select>
                    ) : (
                        <select
                            name="link_type"
                            value={this.state.linkForm.link_type}
                            onChange={this.linkChange}
                        >
                          <option>Select Type</option>
                          <option></option>
                          <option></option>
                          <option></option>
                          <option></option>
                          <option></option>
                          <option></option>
                        </select>
                    )}
                    {!this.state.disabled ? (
                        <input
                            required
                            type="text"
                            name="link_href"
                            value={this.state.linkForm.link_href}
                            onChange={this.linkChange}
                        />
                    ) : null}
                  </div>
                  <button>Add Link</button>
                </form>
            )}
          </div>
        </div>
    )
  }
}

export default connect(
    null,
    { deletePost, updatePost }
)(Post)
