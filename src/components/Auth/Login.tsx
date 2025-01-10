import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Button } from '@mui/material';

/**
 * Login component that allows users to log in by providing their email and password.
 * @returns {JSX.Element} The rendered Login component.
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the login process by checking the provided email and password against stored user data.
   * If the credentials are correct, navigates to the home page.
   * Otherwise, sets an appropriate error message.
   */
  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        navigate('/home');
      } else {
        setError('Invalid email or password.');
      }
    } else {
      setError('No user found. Please register first.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <Button variant="contained" color="primary" onClick={handleLogin} className="mdc-button mdc-button--raised">Login</Button>
      <p>
        Don't have an account?{' '}
        <span className="register-link" onClick={() => navigate('/register')}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
