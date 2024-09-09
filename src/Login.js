// src/LoginOptions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const LoginOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome</h1>
        <div>
          <button onClick={() => navigate('/signin')}>Sign In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </header>
    </div>
  );
};

export default LoginOptions;
