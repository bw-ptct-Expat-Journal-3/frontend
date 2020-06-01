import React, { Component } from 'react'
import { addPost } from '../actions'

import '../styles/addform.css'

class AddPostForm extends Component {
  state = {
    linkCount: 0,
    token: '',
    userId: '',
    input: {
      post_name: '',
      description: '',
      links: {},
      files: ''
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('data'))
    const token = localStorage.getItem('token')
    this.setState({
      token: token,
      userId: user.id
    })
  }

  linkChanges = e => {
    this.setState({
      input: {
        ...this.state.input,
        links: {
          ...this.state.input.links,
          [e.target.id]: {
            ...this.state.input.links[e.target.id],
            [e.target.name]: e.target.value
          }
        }
      }
    })
  }

  addLink = e => {
    e.preventDefault()
    this.setState({
      linkCount: this.state.linkCount + 1,
      input: {
        ...this.state.input,
        links: {
          ...this.state.input.links,
          [`link${this.state.linkCount + 1}`]: {
            link_type: '',
            link_href: ''
          }
        }
      }
    })
  }

  submitAdd = e => {
    e.preventDefault()
    const post = {
      name: this.state.input.post_name,
      description: this.state.input.description,
      links: Object.values(this.state.input.links)
    }
    this.props
      .addPost(post, this.state.userId, this.state.token)
      .then(() => {
        this.props.history.push('/dashboard')
      })
  }

  handleChanges = e => {
    this.setState({
      input: {
        ...this.state.input,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    return (
      <div className="addform">
        <form onSubmit={this.submitAdd}>
          <div className="addheader">
            <h2>Submit Your Post</h2>
          </div>
          <>
            <label htmlFor="post_name">Post Name</label>
            <input
              id="post_name"
              type="text"
              name="post_name"
              placeholder="Name your trip!"
              value={this.state.input.post_name}
              onChange={this.handleChanges}
              required
            />
          </>
          <>
            <label htmlFor="city_name">City</label>
            <input
                id="city_name"
                type="text"
                name="city_name"
                placeholder="City"
                value={this.state.input.city.name}
                onChange={this.handleChanges}
                required
            />
          </>
          <>
            <label htmlFor="country_name">Country</label>
            <input
                id="country_name"
                type="text"
                name="country_name"
                placeholder="Country"
                value={this.state.input.country.name}
                onChange={this.handleChanges}
                required
            />
          </>
          <>
            <label htmlFor="description">Trip Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="How were your travels?"
              value={this.state.input.description}
              onChange={this.handleChanges}
              required
            />
          </>
          <>
            <button className="addlink" onClick={this.addLink}>
              Add Link
            </button>
            {Object.keys(this.state.input.links).map(link => (
              <div key={link}>
                <select
                  id={link}
                  value={this.state.input.links[link].link_type}
                  onChange={this.linkChanges}
                  name="link_type"
                >
                  <option defaultValue>Select Type</option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
                <input
                  required
                  id={link}
                  type="text"
                  value={this.state.input.links[link].link_href}
                  onChange={this.linkChanges}
                  name="link_href"
                  placeholder="Link URL"
                />
              </div>
            ))}
          </>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default(

  { addPost }
)(AddPostForm)
