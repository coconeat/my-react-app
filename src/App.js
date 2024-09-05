import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          我叼你妈的
        </p>
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
      </header>
    </div>
  );
}

export default App;
