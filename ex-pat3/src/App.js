import React from "react";
import Logon from "./kcomponent/Logon";
import Home from "./kcomponent/home";
import About from "./kcomponent/about";

import Comment from "./kcomponent/comment";
// import Logon from "../kcomponent/Logon";
// import logo from "./logo.svg";

// import MyCompo from "./kcomponent/things";

// import Navigation from "./kcomponent/nav";
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

        <Link to="/">Login</Link>
      </div>
      {/* <Navigation /> */}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Comment />
        </Route>
        <Route path="/">
          <Logon />
        </Route>
      </Switch>
    </div>
  );
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
