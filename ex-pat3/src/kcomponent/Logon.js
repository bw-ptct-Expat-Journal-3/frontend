import React, { useState } from "react";
import axios from "axios";
import { Switch, Link, Route } from "react-router-dom";
import Form from "./login";
import "../App.css";

function Logon() {
  const [value, setValue] = useState({
    username: "",

    password: "",
  });
  //   const [errorState, setErrorState] = useState({
  //     // id: "",
  //     username: "",

  //     password: "",
  //   });

  const inputChange = (e) => {
    console.log("input changed");
    e.persist();
    //validate(e);
    let thevalue = e.target.value;
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValue({ ...value, [e.target.name]: thevalue });
  };

  function login() {
    // alert("login called");
    // setValue(e.target.value);
    console.warn("value: ->", value);
    axios
      //   .post("http://localhost:8000/api/auth/login", value, {
      .post(
        "https://expat-journal-backend-jensen.herokuapp.com/api/auth/login",
        value,
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(value),
        }
      )
      //   .then((result) => {
      //     result.json();
      //   })
      .then((resp) => {
        console.log(resp.data.token);
        localStorage.setItem("token", resp.data.token);
      });
    //   });
  }

  //     fetch("http://localhost:8000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(value),
  //     }).then((result) => {
  //       result.json().then((resp) => {
  //         // console.log(resp.token);
  //         localStorage.setItem("token", resp.token);
  //       });
  //     });
  //   }
  return (
    <div>
      <div>
        <form onSubmit={login}>
          <fieldset className="dk">
            <legend>User Login Page</legend>
            <div className="dk-form">
              <input
                className="input"
                type="text"
                name="username"
                //   value={value.username}
                placeholder="Enter Name"
                onChange={inputChange}
              />
              <br />
              <br />
              <input
                className="input"
                type="text"
                name="password"
                //   value={value.password}
                placeholder="Enter Password"
                onChange={inputChange}
              />
              <br />
              <br />
              <>
                <div>
                  <Link to="/login">
                    <button
                      className="btn"
                      onClick={() => {
                        // return (
                        //   <>
                        //     {/* <Route path="/login"> */}
                        //       <Form />
                        //     {/* </Route> */}
                        //   </>
                        // );
                        //   alert("clicked");
                        // return (
                        //   <div>
                        //     <div>
                        //       <Link to="/login" />
                        //     </div>
                        //     <Route path="/login">
                        //       <Form />
                        //     </Route>
                        //   </div>
                        // );
                      }}
                    >
                      Sign Up
                    </button>
                  </Link>
                  <button className="btn" type="submit">
                    Login
                  </button>
                </div>
                <Switch>
                  <Route path="/login">
                    <Form />
                  </Route>
                </Switch>
              </>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Logon;
