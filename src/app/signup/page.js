"use client"


import React, { useState } from 'react';
import '../../css/signup.css';
import Link from 'next/link';

const Signup = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
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

                    <div className="formGroup">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={{
                                borderColor: passwordsMatch ? '#57606f' : '#e74c3c',
                            }}
                        />
                        {!passwordsMatch && (
                            <p style={{ color: '#e74c3c', fontSize: '12px', marginTop: '5px' }}>
                                Passwords do not match
                            </p>
                        )}
                    </div>

                    <button type="submit" disabled={!passwordsMatch}>
                        Sign Up
                    </button>

                    <div className="signup-link">
                        <p>
                            Already have an account?{' '}
                            <Link href={"/"}>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;