import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
// generated-by-copilot: Import sanitization utilities for XSS prevention
import { isValidUsername } from '../utils/sanitize';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // generated-by-copilot: Validate username format before submission
    if (!isValidUsername(username)) {
      setError('Invalid username format.');
      return;
    }
    
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Username and token are now stored in Redux and localStorage by setUser
      dispatch(setUser({ token: data.token, username }));
      navigate('/favorites');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button id="login" type="submit">Login</button>
    </form>
  );
};

export default Login;
