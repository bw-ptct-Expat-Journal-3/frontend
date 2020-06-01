import React from "react";
import React, { Component } from 'react'
import Logon from "./components/Logon";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/about";
import Account from "./components/account";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import Post from './components/Post'
import AddPostForm from './components/AddPostForm'

// import Logon from "../component/Logon";
// import logo from "./logo.svg";

// import MyCompo from "./component/things";
import Navigation from "./components/nav";
// import Protected from "./kcomponent/protected";

import { Switch, Link, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Link to="/home">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/login">Login</Link>
        <Link to="/">Registration</Link>


      </div>
      {/* <Navigation /> */}
      <Switch>
        <Route path="/home" component: {Home}/>
        <Route path="/about" components={About}/>
        <Route path="/login" component={Logon}/>
        <Route path="/contact" component={Contact}/>
        <Route exact path="/" component={RegistrationForm} />
      </Switch>

      const RouterNav = withRouter(Nav)
      return (
      <Router>
        <ScrollToTop>
      <div className="App">
        <RouterNav />
        <Route exact path="/" component={RegistrationForm} />
          {/* <Route path="/login" component={LoginForm} /> */}
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <PrivateRoute
            exact
            path="/add-post"
            component={AddPostForm}
            props={this.props}
        />
           <PrivateRoute
            exact
            path="/post-details/:id"
            component={Post}
        />
        <Footer />
      </div>
        </ScrollToTop>
      </Router>
      )
      }
      }

      export default connect(
}

export default App;

// <Switch>
//   <Route path="/about">
//     <Protected cmp={About} />
//   </Route>
//   <Route path="/contact">
//     {/* <Contact /> */}
//     <Protected cmp={Contact} />
//   </Route>
//   <Route path="/home">
//     <Protected cmp={Home} />
//     <Home />
//   </Route>
//   <Route path="/">
//
//   </Route>
// </Switch>
// <Logon />
