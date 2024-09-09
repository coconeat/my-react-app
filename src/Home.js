import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Home = ({ isAuthenticated, onLogout }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Form submitted with:', { name, email, phone });
    // Optionally, handle form submission logic like making an API request, etc.
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isAuthenticated ? (
          <>
            <p>Create a New User in Odoo</p>
            <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name..."
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email..."
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone..."
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h1>Welcome</h1>
            <div>
              <button onClick={handleSignIn} style={{ marginRight: '10px' }}>Sign In</button>
              <button onClick={handleSignUp} style={{ marginRight: '10px' }}>Sign Up</button>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
