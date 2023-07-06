import React, { useRef, useState } from 'react';
import axiosClient from '../../axios';
import { NavLink, Navigate } from 'react-router-dom';

import './style/login.css'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();


    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setErrors(null);

    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
            debugger
          } else {
            setErrors({
              email: [response.data.message],
            });
          }
        }
      });
  };

  
  return (
    <main className="Login">
      <div className="form-body">
        <div className="Login_header">
          <h1>Login</h1>
        </div>
        <p className="login_p">Sign in to check Result</p>
        <form className="l-form" onSubmit={handleLogin}>
          <div className="inner_lform">
            <label htmlFor="">Email:</label>
            <input ref={emailRef} type="text" placeholder="Enter Matriculation Number" />
          </div>
          <div className="inner_lform">
            <label htmlFor="">Password:</label>
            <input ref={passwordRef} type="password" placeholder="Enter Password" />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="L_section">
          {/* <span>
            Don't have an account?
            <NavLink to="/register" style={{ textDecoration: "none", color: "#1c2767" }}>
              Register
            </NavLink>
          </span> */}
          {errors && (
            <div className="lalert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
              <p>Err</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
