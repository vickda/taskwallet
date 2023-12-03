// ErrorComponent.js
import React from "react";
import Login from "./Login";

const ErrorComponent = ({ message }) => {
  return (
    <>
      <div className="bg-red-500 flex justify-center text-white p-4 rounded-md shadow-md">
        <svg
          className="w-6 h-6 inline-block mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        <span className="align-middle">{message}</span>
      </div>

      <Login />
    </>
  );
};

export default ErrorComponent;
