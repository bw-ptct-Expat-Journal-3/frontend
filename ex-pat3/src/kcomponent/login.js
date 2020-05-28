import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import "../App.css";
// import styled from "styled-components";

// {
//   /* <div className="form-wrapper">
// <form onSubmit={submitForm}>
//   <fieldset>
//     <legend>Form goes down here</legend>
//     <label className="dklabel" htmlFor="name">
//       Name:
//       <input
//         className="dktext"

//       />
//     </label>
//     <br></br>

//     {/* label and password for password
//     <label className="dklabel" htmlFor="password">
//       Password:
//       <input
//         className="dktext"

//       />
//     </label>
//     {/* Button and Submit *
//     <button type="submit">Submit</button>
//   </fieldset>
// </form>
// </div> */
// }

// const StyledH3 = styled.label`
//   background: dodgerblue;
//   border: 2px solid green;
//   font-weight: bold;
//   font-size: 50px;
//   color: red;
//   border-radius: 10px;
// `;

const formSchema = yup.object().shape({
  //take name of each of our form from the <input name="name"
  id: yup.number(),
  username: yup.string().required("Name is required"),
  password: yup
    .string()
    //.password("valid password plz")
    .required("Cant't be empty"),

  first_name: yup.string().required("cant' be emty"),
  last_name: yup.string().required("Cant't be empty"),
  email: yup.string().email("email must be valid").required("Cant't be empty"),
  //.password("valid password plz")

  //   terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
}); //expression for yup completes

const Form = () => {
  // state defining and assinging  an object :Destructuring
  const [dataState, setDataState] = useState({
    // id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    // id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const validate = (e) => {
    let value = e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    console.log("input changed");
    e.persist();
    validate(e);
    let value = e.target.value;
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDataState({ ...dataState, [e.target.name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submitted!!!!");
    console.log(dataState);
    axios

      /*

    // Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
*/
      // https://expat-journal-backend-jensen.herokuapp.com/ that should work

      // Lauren  7:08 PM

      .post(
        // "https://expat-journal-backend-jensen.herokuapp.com/api/auth/register",
        "http://localhost:8000/api/auth/register",
        dataState,
        {
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dataState),
        }
      )
      .then((response) => {
        console.log(response);
      })

      //1. Edit
      // .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={submitForm}>
        <fieldset className="dk1">
          <legend>Sign Up Form</legend>
          <label className="dklabel" htmlFor="username">
            Name:
            <input
              className="input1"
              type="text"
              name="username"
              id="name"
              value={dataState.username} //default value will be the text entered val
              placeholder="Enter Name"
              onChange={inputChange}
            />
          </label>
          <br></br>

          {/* label and password for password */}
          <label className="dklabel" htmlFor="password">
            Password:
            <input
              className="input1"
              type="password"
              name="password"
              id="password"
              value={dataState.password}
              placeholder="Encrypted"
              onChange={inputChange}
            />
          </label>

          <label className="dklabel" htmlFor="first_name">
            First Name:
            <input
              className="input1"
              type="text"
              name="first_name"
              id="fname"
              value={dataState.first_name} //default value will be the text entered val
              placeholder="Enter Name"
              onChange={inputChange}
            />
          </label>
          <br></br>

          <label className="dklabel" htmlFor="last_name">
            Last Name:
            <input
              className="input1"
              type="text"
              name="last_name"
              id="lname"
              value={dataState.last_name} //default value will be the text entered val
              placeholder="Enter Name"
              onChange={inputChange}
            />
          </label>
          <br></br>

          <label className="dklabel" htmlFor="email">
            email:
            <input
              className="input1"
              type="text"
              name="email"
              id="email"
              value={dataState.email} //default value will be the text entered val
              placeholder="Enter Name"
              onChange={inputChange}
            />
          </label>
          <br></br>
          {/* Button and Submit */}
          <button className="btn" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
