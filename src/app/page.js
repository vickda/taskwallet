"use client"

import React, { useState } from 'react';
import '../css/login.css';
import logo1 from '../images/logo1.jpg'
import Link from 'next/link';

const Login = () => {
  // State variables to store form data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handlers for form input changes
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Use the data as needed (e.g., send it to a server, perform authentication, etc.)
    console.log('Username:', username);
    console.log('Password:', password);

    // Reset the form fields if needed
    setUsername('');
    setPassword('');
  };

  console.log(logo1);

  return (
    <div className="container">
      <div className="card">
        <h2><img src={logo1['src']} id='logo1'></img> <br></br> TaskWallet</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account?{' '}
            <Link href={"/signup"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
