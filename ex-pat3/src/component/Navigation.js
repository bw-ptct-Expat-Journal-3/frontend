import React from "react";
import "../App.css";
import { Route, Link } from "react-router-dom";

function Navigation(props) {
    return(
        <div>
            <div className="AppContainer">
                <Link to={"/home"}>Home</Link>
                <Link to="/aout">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login</Link>
                <Link to="/">Register</Link>
        </div>        
            </div>
    );
    export default Navigation;

    //<Route path="/home"/>Home</Route>
    //<Route path="/about"/>About</Route>
    //<Route path="/contact"/>Contact</Route>
    //<Route path="/login"/>Login</Route>
    <Route path="/">

    </Route>
   // <Switch />
   // <Register />

}