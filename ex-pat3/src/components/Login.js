import React, { Component } from 'react';
import { axiosWithAuth } from '../utils/axiosAuth';

class Login extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // add in login api call
    axiosWithAuth()
       .post('/login', this.state.credentials)
       .then(res => {
         console.log(res);
         localStorage.setItem('token', res.data.payload);
         // nice for UX, auto redirect to the main dash
         this.props.history.push('/protected');
       })
       .catch(err => {
         console.log(err);
       });
  };

   render() {
      return (
         <div className='login-container'>
            <h3>Login</h3>
            <form onSubmit={this.login}>
                  <label htmlFor='inputUsername'>Username:</label>
                     <input
                        type='text'
                        name='username'
                        id='inputUsername'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                     />
                  <label htmlFor='inputPassword'>Password:</label>
                     <input
                        type='password'
                        name='password'
                        id='inputPassword'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                     />
               <button>Login</button>
            </form>
         </div>
      );
   }
}

export default Login;
