import React, { useState } from 'react';
import { API_URL } from '../../Data/apiPath';

const Register = ({showloginhandler}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert('Vendor Registered successfully');
        showloginhandler()
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      setError('Vendor registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registersection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Vendor Register</h2>
        <label>Username</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <div className="submitsection">
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Submit'}
          </button>
        </div>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
