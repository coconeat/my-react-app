import React, { useState } from 'react';
import { signUp, confirmSignUp } from './auth';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const SignUp = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmationCodeSent, setIsConfirmationCodeSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, password, email, phone);
      setIsConfirmationCodeSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(username, confirmationCode);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sign Up</h1>
        {isConfirmationCodeSent ? (
          <form onSubmit={handleConfirmSubmit} style={{ marginTop: "20px" }}>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Confirmation Code"
              style={{ marginRight: "10px" }}
            />
            <button type="submit">Confirm Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ marginRight: "10px" }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ marginRight: "10px" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ marginRight: "10px" }}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              style={{ marginRight: "10px" }}
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
};

export default SignUp;
