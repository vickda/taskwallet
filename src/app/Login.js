"use client";

import React, { useState } from 'react';
import '../css/login.css';
import logo1 from '../images/logo1.jpg'
import GoogleIcon from '../images/google-icon.png';
import GitHubIcon from '../images/githubicon.png';

import {signIn} from 'next-auth/react'

const Login = () => {


  return (
    <div className="container">
      <div className="card">
        <h2><img src={logo1['src']} id='logo1'></img> <br></br> TaskWallet</h2>

        <button type="button" className="google-button" onClick={() => signIn('google')}>
          <img src={GoogleIcon['src']} className="google-icon" /> Sign in with Google
        </button>

        <br></br>

        <button type="button" className="github-button" onClick={() => signIn('github')}>
            <img src={GitHubIcon['src']} className="github-icon" alt="GitHub Icon" /> Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
