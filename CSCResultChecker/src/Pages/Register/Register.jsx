import React, { useState } from 'react'
import {useRef} from 'react'
import axiosClient from '../../axios';
// stylesheet
import "./style/Register.css";

// Nav link
import { NavLink } from "react-router-dom";

const Register = () => {

  //  const [state, setState] = useState({
  //   year: "----Select A Year----",
  // });

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [mat_no, setMat_no] = useState('');
    // const [password, setPassword] = useState('');
    // const [cpassword, setCpassword] = useState('');
    // const [entry_year, setEntry_year] = useState('');
    // const [error, setError] = useState({ __html: '' });
    // // const onSubmit = (ev) => {
    //   ev.preventDefault();

    // }
  const nameRef = useRef();
  const emailRef = useRef();
  const matnoRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const entry_yearRef = useRef();
  const {errors, SetErrors} = useState(null);

  // register form submit function
  const handleRegister = (event) => {
    event.preventDefault();

    const playload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      mat_no: matnoRef.current.value,
      entry_year: entry_yearRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: cpasswordRef.current.value,
    }

     console.log(playload);


    axiosClient.post('/register', playload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })

      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
           console.log(response.data.errors);
          // SetErrors();
        }
      })

  }

  return (
    <main className='register'>
      <div className="register_header">
        <h1>Register</h1>
      </div>
      <p>Create your account now!</p>
      <form className="register_form" onSubmit={handleRegister}>

        {
          errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{[errors][0]}</p>
            ))}
          </div>
        }
      <div className="inner_form">
          <label htmlFor="">Full Name</label>
          <input  ref={nameRef} type="name" placeholder="Enter Full name"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Mat Number</label>
          <input ref= {matnoRef} type="text" placeholder="Enter Matriculation Number" />
        </div>
        <div className="inner_form">
          <label htmlFor="">Email</label>
          <input ref={emailRef} type="email" placeholder="Enter School Email"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Password</label>
          <input ref={passwordRef} type="password" placeholder="Enter Password" />
        </div>
        <div className="inner_form">
          <label htmlFor="">Confirm Password</label>
          <input ref={cpasswordRef} type="password" placeholder="Enter School Email"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Year Of Enrollment</label>
            {/* <select value={state.year}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select> */}
          <select id="my-dropdown"  ref={entry_yearRef} valaue="----Select A Year----">
          {/* <option value="default" selected></option> */}
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="register_section">
        <span>
          Already have an account?
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "#1c2767" }}
          >
            {" "}Check your result
          </NavLink>
        </span>
      </div>
    </main>
  )
}

export default Register
