import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import axios from "axios";
import * as yup from "yup";
import "../App.css";





 
const formSchema = yup.object().shape({
    firstname: yup.string().required("First name is a required field"),
    lastname: yup.string().required("Last name is a required field"),
    email: yup.string().required("Email is a required field"),
    username: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field")
        
});

export default function Register() {

    const initialRegisterState ={
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        
    };

    const [serverError, setServerError] = useState("");
    const [post, setPost] = useState([]);
    const [formState, setFormState] = useState(initialRegisterState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        
    });

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.first_name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.first_name]:""
                })
            })
            .catch(errors => {
                setServerError({
                    ...errors,
                    [e.target.first_name]:errors.errors[0]
                });
            });
    };
  
    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
             console.log('valid?', valid);
             setIsButtonDisabled(!valid);
         });
     }, [formState]);

     const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted!');
        axios
            .post("https://localhost:3001/api/auth/register/cpdew2", formState)
            .then(response => {
                setPost(response.data);
                console.log("success", post);
                console.log(response.data.text)
                setFormState({
                    first_name: "",
                    last_name: "",
                    email: "",
                    username: "",
                    password: ""
                });
                serverError(null);
            })
            .catch(error => {
                setServerError("something went wrong!");
            });
    };
        

        const inputChange = e => {
            e.persist();

        const newFormData = {
            ...formState, [e.target.text]: e.target.type === "text" ?
            e.target.text: e.target.value };

            validateChange(e);
            setFormState(newFormData);
            console.log(e.target.text)
        };

        return (
            <form
            onSubmit ={formSubmit}> {
                
                //.post("Registration complete, WELCOME!")
            }
                <label htmlFor="first_name">
                <br /><br />
                <br /> First Name<br />
                    
                    <input
                        name="text"
                        first_name="first_name"
                        id="first_nameinput"
                        placeholder=""
                        value={formState.firstname}
                        onChange={inputChange}
                        
                        />
                        {errors.first_name.length > 0 ? <p className="error">{errors.first_name}</p> : null}
                        
                </label>
                

                <label htmlFor="last_name">
                <br /><br />
                <br />Last Name<br />
                    
                    <input
                        name="text"
                        last_name="text"
                        id="last_nameinput"
                        placeholder=""
                        value={formState.lastname}
                        onChange={inputChange}
                                            
                        />
                        {errors.last_name.length > 0 ? <p className="error">{errors.last_name}</p> : null}
                        
                </label>
                

                <label htmlFor="email">
                <br /><br />
                <br />Email<br />
                    
                    <input
                        type="email"
                        name="email"
                        id="emailinput"
                        placeholder=""
                        value={formState.email}
                        onChange={inputChange}
                        
                        />
                        {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                        
                </label>
                
                <label htmlFor="username">
                <br /><br />
                <br />Username<br />
                    
                    <input
                        type="text"
                        name="username"
                        id="usernameinput"
                        //placeholder=""
                        onChange={inputChange}
                        value={formState.username}
                        
                        />
                        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
                        
                </label>
                
                <label htmlFor="password">
                <br /><br />
                <br />Password<br />
                    
                    <input
                        type="password"
                        name="password"
                        id="passwordinput"
                        //placeholder=""
                        onChange={inputChange}
                        value={formState.password}
                        
                       />
                        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                        <br /> 
                </label>
                <br />
               <button name="Register" onSubmit={post} disabled={isButtonDisabled}>Register</button>
                 <pre>{JSON.stringify(post, 'https://localhost:3001/api/auth/register/cpdew2', 2)}</pre>
            </form>
        )

        }

        