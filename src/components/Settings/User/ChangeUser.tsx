import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import './ChangeUser.css';

/**
 * ChangeUser component that allows users to change their username.
 * @returns {JSX.Element} The rendered ChangeUser component.
 */
const ChangeUser: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  /**
   * Handles the username change process by validating the email and password.
   * If the validation is successful, updates the username in local storage and sets a success message.
   * Otherwise, sets an appropriate error message.
   */
  const handleSave = () => {
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('No user data available.');
      return;
    }

    if (email !== currentUser.email || password !== currentUser.password) {
      setError('Invalid email or password.');
      return;
    }

    if (newUsername.trim() === '') {
      setError('Username cannot be empty.');
      return;
    }

    // Update the user object in local storage
    const updatedUser = { ...currentUser, name: newUsername };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setSuccess('Username updated successfully!');
  };

  return (
    <div className="change-username-container">
      <div className="main-content">
        <h2>Change Username</h2>
        <div className="form-container">
          <label>
            New Username:
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
            />
          </label>
            <h2>Verify with</h2>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            <Button variant="contained" color="primary" onClick={handleSave}>
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

export default ChangeUser;
