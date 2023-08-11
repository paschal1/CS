import React, {  useState } from 'react';
import axiosClient from '../../axios';
import { NavLink, Navigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';

import './style/login.css'

const Login = () => {
  const { setCurrentUser, setUserToken} = useStateContext();
    const [email, setEmail] = useState('');
    //const [mat_no, setMat_no] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ __html: '' });

  const handleLogin = (event) => {
    event.preventDefault();
    setError({ __html: '' })

    const playload = {

      email,
      //mat_no,
      password,

    }

    //  console.log(playload);

    axiosClient.get('/sanctum/csrf-cookie').then(response => {


      axiosClient.post('/login', playload)
        .then(({ data }) => {

           setCurrentUser(data.user)
           setUserToken(data.token)


        })

      .catch ((error) => {
        if (error.response) {
        const finalErrors =  Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])

          setError({__html: finalErrors.join('<br>')})
        }
        console.error(error);
      });

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
            <input value={email} onChange={event => setEmail(event.target.value)}  type="text" placeholder="Enter Matriculation Number" />
          </div>
          <div className="inner_lform">
            <label htmlFor="">Password:</label>

            <input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Enter Password" />
          </div>
          <button type="submit">Login</button>

           {error.__html && (<div className='bg-red-500 rounded py-2 px-3 text-white' dangerouslySetInnerHTML={error}></div>)}


        </form>
        <div className="L_section">
          {/* <span>
            Don't have an account?
            <NavLink to="/register" style={{ textDecoration: "none", color: "#1c2767" }}>
              Register
            </NavLink>
          </span> */}
          {/* {errors && (
            <div className="lalert">
              {Object.keys(errors).map((key) => (
                <p key={key}>{errors[key][0]}</p>
              ))}
              <p>Err</p>
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
};

export default Login;
