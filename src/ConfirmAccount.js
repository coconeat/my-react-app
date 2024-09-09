// src/ConfirmAccount.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmSignUp } from './auth';
import logo from './logo.svg';
import './App.css';

const ConfirmAccount = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(username, confirmationCode);
      navigate('/signin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Confirm Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Confirmation Code"
            style={{ marginRight: "10px" }}
          />
          <button type="submit">Confirm Account</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
};

export default ConfirmAccount;
