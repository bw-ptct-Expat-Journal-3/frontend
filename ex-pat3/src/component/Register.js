import React, { useState, useEffect } from 'react';
//import logo from "./logo.svg";
//import Form from "@rjsf/core";
import axios from 'axios';
import * as yup from 'yup';
import 'styled-components';



export default function Register() {


const formSchema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field"),
    firstname: yup.string().required("First name is a required field"),
    lastname: yup.string().required("Last name is a required field"),
    email: yup.string().required("Email is a required field"),
});


    const initialRegisterState ={
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
    };

    const [serverError, setServerError] = useState("");
    const [post, setPost] = useState([]);
    const [formState, setFormState] =useState(initialRegisterState);
    const [isButtonDisabled, setIsButtonDisabled] =useState(true);
    const [errors, setErrors] = useState({

        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
    });


    const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted!');
        axios
            .post("https://expat-journal-backend-jensen.herokuapp.com/api/auth/register", formState)
            .then(response => {
                setPost(response.date);
                console.log("success", post);
                console.log(response.data.psssword)
                setFormState({
                    username: "",
                    password: "",
                    firstname: "",
                    lastname: "",
                    email: "",
                })
                serverError(null);
            })
            .catch(error => {
                setServerError("something went wrong");
            });
    };
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log(formState);
             console.log('valid?', valid);
             setIsButtonDisabled(!valid);
         });
     }, [formSchema]);

        const validateChange = e => {
            yup
                .reach(formSchema, e.target.username)
                .validate(e.target.value)
                .then(valid => {
                    setErrors({
                        ...errors,
                        [e.target.username]:""
                    })
                })
                .catch(errors => {
                    setErrors({
                        ...errors,
                        [e.target.username]:errors.errors[0]
                    });
                });
        };

        

        

        const inputChange = e => {
            e.persist();

        const newFormData = {
            ...formState, [e.target.username]: e.target.type === "text" ?
            e.target.textarea: e.target.value };

            validateChange(e);
            setFormState(newFormData);
            console.log(e.target.username)
        };

        return(
            <form
            onSubmit ={(e) => {
                e.preventDefault();
                alert("Registration complete, WELCOME!")

            }}>
                <label htmlFor="firstname">
                <br /><br />
                    First Name
                    <br /><br />
                    <input
                        type="text"
                        firstname="text"
                        id="firstnameinput"
                        placeholder="First_Name"
                        value={formState.firstname}
                        onChange={inputChange}
                        />
                        {errors.firstname.length > 2 ? <p className="error">{errors.firstname}</p> : null}
                        <br />
                </label>
                

                <label htmlFor="lastname">
                <br /><br />
                    Last Name
                    <br /><br />
                    <input
                        type="text"
                        lastname="text"
                        id="lastnameinput"
                        placeholder="Last_Name"
                        value={formState.lastname}
                        onChange={inputChange}
                        />
                        {errors.lastname.length > 2 ? <p className="error">{errors.lastname}</p> : null}
                        <br />
                </label>
                

                <label htmlFor="email">
                <br /><br />
                    Email
                    <br /><br />
                    <input
                        type="email"
                        email="email"
                        id="emailinput"
                        placeholder="Email"
                        value={formState.email}
                        onChange={inputChange}
                        />
                        {errors.email.length > 2 ? <p className="error">{errors.email}</p> : null}
                        <br />
                </label>
                
                <label htmlFor="username">
                <br /><br />
                    Username
                    <br /><br />
                    <input
                        type="text"
                        username="name"
                        id="usernameinput"
                        placeholder="Username"
                        value={formState.username}
                        onChange={inputChange}
                        />
                        {errors.username.length > 2 ? <p className="error">{errors.username}</p> : null}
                        <br />
                </label>
                

                <label htmlFor="password">
                <br /><br />
                    Password
                    <br /><br />
                    <input
                        type="text"
                        password="text"
                        id="passwordinput"
                        placeholder="Password"
                        value={formState.password}
                        onChange={inputChange}
                        />
                        {errors.password.length > 2 ? <p className="error">{errors.password}</p> : null}
                        <br />
                </label>
                
                <br />

               <button name="Register" onSubmit={post}disabled={isButtonDisabled}>Submit</button>
                 <pre>{JSON.stringify(post, 'https://expat-journal-backend-jensen.herokuapp.com/api/auth/register', 2)}</pre>
            </form>
        )

        }

        