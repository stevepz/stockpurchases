import React from 'react'

const Register = (props) => {

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={props.handleRegister} >
        <div className="login-user">
          <p>Username:</p>
          <input className="login-fields" name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        </div>

        <div className="login-user">
          <p>Password:</p>
          <input className="login-fields" name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        </div>
        <div className="login-login-button-div">
          <button className="login-login-button">Register Me</button>
        </div>
      </form>
    </div >
  );
}

export default Register;