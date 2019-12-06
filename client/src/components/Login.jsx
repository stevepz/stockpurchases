import React, { Component } from 'react'
import { Link } from 'react-router-dom';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();
      }} >
        <div className="login-user">
          <p>Username:</p>
          <input className="login-fields" name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        </div>

        <div className="login-user">
          <p>Password:</p>
          <input className="login-fields" name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        </div>

        <div className="login-user-buttons">
          <div className="login-login-button-div">
            <button className="login-login-button">Click Here to Login</button>
          </div>
          <Link className="login-register-button" to="/register">Click Here to Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;