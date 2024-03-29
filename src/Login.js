// Login component //

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// async function loginUser(credentials) {
//  return fetch('http://localhost:3000/login', {
//    method: 'POST',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(credentials)
//  })
//    .then(data => data.json())
// }

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    // const token = await loginUser({
    //   username,
    //   password
    // });
    if(username=== "MophmAdmin" && password=== "MophmGonenSH2022"){
        setToken("abc");
        window.location.href="/"
    }
    else{
        alert("Wrong details!")
        window.location.reload(false)
        // setToken("user")
    }
  }

  return(
    <div className="login-wrapper">
      
      <body className="login-body">
    <div className="login-background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-h3">Login Here</h3>

        <label className="login-label" for="username">Username</label>
        <input className="login-input" type="text" placeholder="Username" id="username" onChange={e => setUserName(e.target.value)}/>

        <label className="login-label" for="password">Password</label>
        <input className="login-input" type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)}/>

        <button className="login-button">Log In</button>
            
    </form>
    </body>
</div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
