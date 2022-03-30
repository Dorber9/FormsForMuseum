import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
 return fetch('http://localhost:3000/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    // const token = await loginUser({
    //   username,
    //   password
    // });
    console.log("im here")
    console.log(username)
    console.log(password)
    if(username== "MophmAdmin" && password== "j8$c~m38S484<nA)")
        setToken("abc");
    else{
        alert("Wrong details!")
        // window.location.reload(false)
    }
  }

  return(
    <div className="login-wrapper">
      
      <body>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" onChange={e => setUserName(e.target.value)}/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={e => setPassword(e.target.value)}/>

        <button>Log In</button>
            
    </form>
    </body>
</div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};