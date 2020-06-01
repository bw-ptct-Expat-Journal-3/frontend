import React, { Component } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import axios from 'axios'
import '../styles/account.css'
import { updateUser } from '../actions'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      user: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        id: ''
      },
      token: ''
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('data'))
    const token = localStorage.getItem('token')
    this.setState({
      user: {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id
      },
      token: token
    })
  }

  updateUser = e => {
    e.preventDefault()
    this.props.updateUser(this.state.user, this.state.token)
    this.setState({
      disabled: true
    })
  }

  changeHandler = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  editHandler = () => {
    if (!this.state.disabled) {
      const { username, email, first_name, last_name } = this.props.user
      this.setState({
        user: {
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name
        },
        disabled: true
      })
    } else {
      this.setState({
        disabled: false
      })
    }
  }

  render() {
    return (
      <div className="accform">
        <fieldset disabled={this.state.disabled}>
          <form onSubmit={this.updateUser}>
            <div className="accheader">
              <h3>Account Settings</h3>
              <p>Just hit the "Edit" button to change your account details.</p>
            </div>
            <p
              className={`${this.state.disabled ? 'edit' : 'cancel'}`}
              onClick={() => this.editHandler()}
            >
              {this.state.disabled ? 'EDIT' : 'CANCEL'}
            </p>

            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                onChange={this.changeHandler}
                defaultValue={this.state.user.username}
                disabled={this.state.disabled}
            />

            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              onChange={this.changeHandler}
              defaultValue={this.state.user.first_name}
              disabled={this.state.disabled}
            />

            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              onChange={this.changeHandler}
              defaultValue={this.state.user.last_name}
              disabled={this.state.disabled}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ex. example@example.com"
              onChange={this.changeHandler}
              defaultValue={this.state.user.email}
              disabled={this.state.disabled}
              aria-label="email"
            />

            {this.state.disabled ? null : <button type="submit">Submit</button>}
          </form>
        </fieldset>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.user.token
  }
}

export default connect(
  mapStateToProps,
  { updateUser }
)(Account)
