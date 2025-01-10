import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import './Settings.css';
/**
 * Login component that allows users to change their credentials by redirecting to the responsible component.
 * @returns {JSX.Element} The rendered ChangeUser component.
 */
const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <div className="main-content">
        <h2>Settings</h2>
        <div className="settings-options">
          <Button variant="contained" color="primary"
            onClick={() => navigate('/settings/change-email')}
          >
            Change Email
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => navigate('/settings/change-username')}
          >
            Change Username
          </Button>
          <Button variant="contained" color="primary"
            onClick={() => navigate('/settings/change-password')}
          >
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
