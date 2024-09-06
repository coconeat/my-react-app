import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { handleSubmit } from './handleFormSubmission'; // Correct the import path

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
          Create a New User in Odoo
        </p>
        <form onSubmit={(event) => handleSubmit(event, name, email, phone)}> {/* Set up form submission */}
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
          <button type="submit">Submit</button> {/* Submit button */}
        </form>
      </header>
    </div>
  );
}

export default App;
