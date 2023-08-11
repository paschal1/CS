import React, { useState } from 'react'

import axiosClient from '../../axios';
// stylesheet
import "./style/Register.css";

// Nav link
import { NavLink, unstable_HistoryRouter } from "react-router-dom";
import { useStateContext } from '../../contexts/ContextProvider';

const Register = () => {

  //  const [state, setState] = useState({
  //   year: "----Select A Year----",
  // });
  const { setCurrentUser, setUserToken} = useStateContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mat_no, setMat_no] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [entry_year, setEntry_year] = useState('');
    const [error, setError] = useState({ __html: '' });
    // // const onSubmit = (ev) => {
    //   ev.preventDefault();

    // }

  // const nameRef = useRef();
  // const emailRef = useRef();
  // const matnoRef = useRef();
  // const passwordRef = useRef();
  // const cpasswordRef = useRef();
  // const entry_yearRef = useRef();
  // const {errors, SetErrors} = useState(null);

  // register form submit function
  const handleRegister = (event) => {
    event.preventDefault();
    setError({ __html: '' })

    const playload = {
      name,
      email,
      mat_no,
      entry_year,
      password,
      password_confirmation: passwordConfirmation,
    }

    //  console.log(playload);

    axiosClient.get('/sanctum/csrf-cookie').then(response => {


      axiosClient.post('/register', playload)
        .then(({ data }) => {



           setCurrentUser(data.user)
           setUserToken(data.token)
          // if (data) {
          //   <Navigate to="/check_result"/>
          // }

        })

      .catch ((error) => {
        if (error.response) {
        const finalErrors =  Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          console.log(finalErrors)
          setError({__html: finalErrors.join('<br>')})
        }
        console.error(error);
      });

      // .catch(err => {
      //   const response = err.response;
      //   if (response && response.status === 422) {
      //      console.log(response.data.errors);
      //      //SetErrors();
      //   }
      // })
      });

  }

  return (
    <main className='register'>
      <div className="register_header">
        <h1>Register</h1>
      </div>
      <p>Create your account now!</p>

      {error.__html && (<div className='bg-red-500 rounded py-2 px-3 text-white' dangerouslySetInnerHTML={error}></div>)}

      <form className="register_form" onSubmit={handleRegister}>


        <div className="inner_form">

          <label htmlFor="">Full Name</label>
          {name}
          <input  name='name' value={name} onChange={event => setName(event.target.value)} type="name" placeholder="Enter Full name"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Mat Number</label>
          {mat_no}
          <input name='mat_no' value={mat_no} onChange={event => setMat_no(event.target.value)} type="text" placeholder="Enter Matriculation Number" />
        </div>
        <div className="inner_form">
          <label htmlFor="">Email</label>
          {email}
          <input name='email' value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="Enter School Email"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Password</label>

          <input name='password' value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Enter Password" />
        </div>
        <div className="inner_form">
          <label htmlFor="">Confirm Password</label>
          <input  type="password" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} id='password-confirmation' name='password_confirmation' placeholder="Enter Password Again"  />
        </div>
        <div className="inner_form">
          <label htmlFor="">Year Of Enrollment</label>
            {/* <select value={state.year}>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select> */}
          <select id="my-dropdown" value={entry_year} onChange={event => setEntry_year(event.target.value)}  name='entry_year' valaue="----Select A Year----">
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

        {/* {
          errors && <div className="alert">
            {//Object.keys(errors).map(key => (
              <p key={key}>{[errors][0]}</p>
            ))}
          </div>
        } */}
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
