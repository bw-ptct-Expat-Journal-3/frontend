import React, { useState } from "react";
import axios from "axios";
import { Switch, Link, Route } from "react-router-dom";
import Form from "./login";
import * as yup from "yup";

import "../App.css";

const formSchema = yup.object().shape({
  //take name of each of our form from the <input name="name"

  username: yup.string().required("Name is required"),
  password: yup
    .string()
    //.password("valid password plz")
    .required("Cant't be empty"),
});

function Logon() {
  //

  const validate = (e) => {
    let value = e.target.value;

    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorValue({
          ...errorValue,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorValue({
          ...errorValue,
          [e.target.name]: err.errors[0],
        });
      });
  };

  //
  const [value, setValue] = useState({
    username: "",

    password: "",
  });

  const [errorValue, setErrorValue] = useState({
    username: "",

    password: "",
  });
  //validate

  // validate

  const inputChange = (e) => {
    console.log("input changed");
    e.persist();

    validate(e);
    let thevalue = e.target.value;
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValue({ ...value, [e.target.name]: thevalue });
  };

  function login() {
    // alert("login called");
    // setValue(e.target.value);
    console.warn("value: ->", value);
    axios
      // .post("http://localhost:8000/api/auth/login", value, {
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
                    <button className="btn">Sign Up</button>
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
