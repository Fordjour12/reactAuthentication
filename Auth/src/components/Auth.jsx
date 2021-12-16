import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiUser, BiLock, BiEnvelope } from "react-icons/bi";
import Log from "../images/undraw_login_re_4vu2.svg";
import classes from "./Auth.module.css";

const Auth = ({ setToken }) => {
    // changeForm handler form changing form signup to login
    const [changeForm, setChangeForm] = useState(false);
    const changeFormHandler = () => setChangeForm(!changeForm);
    const changeFormBack = () => setChangeForm(false);

    // state for validation and output to servers
    const [email, setEnteredEmail] = useState("");
    const [username, setEnteredUserName] = useState("");
    const [password, setEnteredPassword] = useState("");
    const [signupFormIsValid, setSignupFormIsValid] = useState(false);
    const [loginFormIsValid, setLoginFormIsValid] = useState(false);

    const [loginStatus, setLoginStatus] = useState(false)

    // loginUseEffect
    useEffect(() => {
        const identifier = setTimeout(() => {
            setLoginFormIsValid(
                password.trim().length > 6 && username.trim().length > 3,
            );
        }, 500);
        return () => {
            clearInterval(identifier);
        };
    }, [username, password]);

    // signupUseEffect
    useEffect(() => {
        const identifier = setTimeout(() => {
            setSignupFormIsValid(
                email.includes("@") &&
                    password.trim().length > 6 &&
                    username.trim().length > 3,
            );
        }, 500);
        return () => {
            clearInterval(identifier);
        };
    }, [username, email, password]);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

    const usernameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    };

    //     const validateEmailHandler = () => {
    //         setEmailIsValid(email.includes("@"));
    //     };
    //
    //     const validatePasswordHandler = () => {
    //         setPasswordIsValid(password.trim().length > 6);
    //     };
    //
    //     const validateUserNameHandler = () => {
    //         setUserNameIsValid(username.trim().length > 3);
    //     };

    const submitSignUpFormHandler = async (event) => {
        event.preventDefault();

        const response = await fetch(
            "http://192.168.63.242:5001/api/v1/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            },
        );
        const responseData = await response.json();
        console.log(responseData);
    };

    const submitLoginFormHandler = async (event) => {
        event.preventDefault();

        const response = await fetch(
            "http://192.168.63.242:5001/api/v1/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            },
        );
     
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);

        console.log(responseData);
    };

    return (
        <div className={classes.formContainer}>
            <div className={classes.formContent}>
                <div className={classes.imageConatainer}>
                    <img src={Log} alt="" className={classes.image} />
                </div>
                <div className={classes.forms}>
                    <form
                        action=""
                        onSubmit={submitLoginFormHandler}
                        className={classes.login}
                    >
                        <h1 className={classes.title}>Login</h1>
                        <div className={classes.inputInfo}>
                            <div className={classes.inputBox}>
                                <BiUser className={classes.icons} />
                                <input
                                    type="text"
                                    name="username"
                                    id="loginUsername"
                                    placeholder="Username"
                                    value={username}
                                    onChange={usernameChangeHandler}
                                    // onBlur={validateUserNameHandler}
                                />
                            </div>
                            <div className={classes.inputBox}>
                                <BiLock className={classes.icons} />
                                <input
                                    type="password"
                                    name="password"
                                    id="loginPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={passwordChangeHandler}
                                    // onBlur={validatePasswordHandler
                                />
                            </div>
                        </div>
                        <div>
                            <Link to="#" className={classes.forget}>
                                Forget Password
                            </Link>
                            <button
                                className={classes.btn}
                                disabled={!loginFormIsValid}
                            >
                                sign in
                            </button>
                        </div>

                        <div>
                            <span>Don't have an account?</span>
                            <span>
                                <Link to="#" onClick={changeFormBack}>
                                    Signup
                                </Link>
                            </span>
                        </div>
                    </form>

                    <form
                        onSubmit={submitSignUpFormHandler}
                        className={`${classes.login}  ${
                            changeForm ? classes.hidden : classes.active
                        }`}
                    >
                        <h1 className={classes.title}>Create Account</h1>
                        <div className={classes.inputInfo}>
                            <div className={classes.inputBox}>
                                <BiUser className={classes.icons} />
                                <input
                                    type="text"
                                    name="username"
                                    id="signupUsername"
                                    placeholder="Username"
                                    value={username}
                                    onChange={usernameChangeHandler}
                                    // onBlur={validateUserNameHandler}
                                />
                            </div>
                            <div className={classes.inputBox}>
                                <BiEnvelope className={classes.icons} />
                                <input
                                    type="email"
                                    name="email"
                                    id="signupEmail"
                                    placeholder="Email"
                                    value={email}
                                    onChange={emailChangeHandler}
                                    // onBlur={validateEmailHandler}
                                />
                            </div>
                            <div className={classes.inputBox}>
                                <BiLock className={classes.icons} />
                                <input
                                    type="password"
                                    name="password"
                                    id="signupPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={passwordChangeHandler}
                                    // onBlur={validatePasswordHandler}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className={classes.btn}
                                disabled={!signupFormIsValid}
                            >
                                sign up
                            </button>
                        </div>

                        <div>
                            <span>Already have an account?</span>
                            <span>
                                <Link to="#" onClick={changeFormHandler}>
                                    Signin
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
