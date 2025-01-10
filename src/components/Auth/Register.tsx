import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Button } from '@mui/material';
/**
 * Register component that allows users to create a new account by providing their email and password.
 * @returns {JSX.Element} The rendered Register component.
 */
const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the registration process by validating the provided email and passwords.
   * If the validation is successful, stores the user data in local storage and navigates to the login page.
   * Otherwise, sets an appropriate error message.
   */
  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
        />
      </div>
      {error && <p className="error">{error}</p>}
      <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
      <p>
        Already have an account?{' '}
        <span className="login-link" onClick={() => navigate('/')}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
