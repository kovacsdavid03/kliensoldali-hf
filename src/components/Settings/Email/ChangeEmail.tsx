import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeEmail.css';
import { Button } from "@mui/material";

interface User {
  name: string;
  email: string;
  password: string;
}

/**
 * ChangeEmail component that allows users to change their email address.
 * @returns {JSX.Element} The rendered ChangeEmail component.
 */
const ChangeEmail: React.FC = () => {
  const [newEmail, setNewEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser) as User);
    }
  }, []);

  /**
   * Handles the email change process by updating the user's email in local storage.
   * If the email is successfully updated, sets a success message.
   * Otherwise, sets an appropriate error message.
   */
  const handleChangeEmail = () => {
    if (!currentUser) {
      setError('No user found. Please log in first.');
      return;
    }

    if (username !== currentUser.name || password !== currentUser.password) {
      setError('Invalid username or password.');
      return;
    }

    const updatedUser = { ...currentUser, email: newEmail };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setSuccess('Email updated successfully!');
  };

  return (
    <div className="change-email-container">
      <div className="main-content">
        <h2>Change Email</h2>
        <div className="form-container">
          <label>
            New Email:
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter new email"
            />
          </label>
          <h2>Verify with</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="button-container">
            <Button variant="contained" color="primary" onClick={handleChangeEmail}>
              Save Changes
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/settings')}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
