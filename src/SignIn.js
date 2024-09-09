import React, { useState } from 'react';
import { signIn } from './auth';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const SignIn = ({ onSignInSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      onSignInSuccess();
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirmAccount = () => {
    navigate('/signup', { state: { username } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
        </form>
        {error && (
          <div>
            <p style={{ color: 'red' }}>{error}</p>
            {error === "User is not confirmed" && (
              <button onClick={handleConfirmAccount}>Confirm Account</button>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default SignIn;
