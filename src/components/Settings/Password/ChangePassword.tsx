import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import { Button } from "@mui/material";

/**
 * ChangePassword component that allows users to change their password.
 * @returns {JSX.Element} The rendered ChangePassword component.
 */
const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the password change process by validating the old password and updating to the new password.
   * If the password is successfully updated, sets a success message.
   * Otherwise, sets an appropriate error message.
   */
  const handleChangePassword = () => {
    if (!currentUser) {
      setError('No user found. Please log in first.');
      return;
    }

    if (oldPassword !== currentUser.password) {
      setError('Old password is incorrect.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    const updatedUser = { ...currentUser, password: newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setSuccess('Password updated successfully!');
  };

  return (
    <div className="change-password-container">
      <div className="main-content">
        <h2>Change Password</h2>
        <div className="form-container">
          <label>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="button-container">
            <Button variant="contained" color="primary" className="save-button" onClick={handleChangePassword}>
              Change Password
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

export default ChangePassword;
