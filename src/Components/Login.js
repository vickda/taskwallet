"use client";

// components/Login.js
import React from "react";
import { signIn } from "next-auth/react";
import logo1 from "../images/logo1.jpg";
import GoogleIcon from "../images/google-icon.png";
import GitHubIcon from "../images/githubicon.png";
import "../app/globals.css";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#000000b5] p-8 rounded-3xl w-96 text-center flex flex-col items-center">
        <h2 id="headername" className="text-3xl mb-6 text-white">
          <img
            src={logo1["src"]}
            alt="Logo"
            className="w-16 h-16 mx-auto mb-2"
          />
          TaskWallet
        </h2>

        <button
          type="button"
          className="bg-red-600 text-white py-2 px-4 rounded mb-4 flex items-center justify-center transition duration-300 hover:bg-red-700"
          onClick={() => signIn("google")}
        >
          <img
            src={GoogleIcon["src"]}
            alt="Google Icon"
            className="w-8 h-8 mr-2"
          />
          Sign in with Google
        </button>

        <button
          type="button"
          className="bg-black text-white py-2 px-4 rounded flex items-center justify-center transition duration-300 hover:bg-slate-800	"
          onClick={() => signIn("github")}
        >
          <img
            src={GitHubIcon["src"]}
            alt="GitHub Icon"
            style={{ background: "white" }}
            className="w-8 h-8 mr-2"
          />
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
