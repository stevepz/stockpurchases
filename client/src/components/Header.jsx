import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <div>
      <div id="header">

        <div id="header-link-div">
          <Link id="header-link" className="header-link" to="/"><button className="home-button">Home</button></Link>
        </div>
        <div id="header-link2-div">
          <h1 className="header-title">Stock Purchase</h1>
        </div>

        {
          props.user.username && (
            <div id="header-links-loggedin">

              <button
                className="header-logout"
                onClick={props.handleLogout}>Logout</button>
            </div>
          )
        }
      </div>
      {
        props.user.username && (
          <h2 id="header-welcome">Welcome {props.user.username}</h2>
        )
      }
    </div>
  )
}