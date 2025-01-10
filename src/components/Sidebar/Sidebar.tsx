import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

/**
 * Sidebar component that provides navigation links to different sections of the TODO app.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar: React.FC = () => {
  // Using useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">TODO App</h3>
      <ul className="sidebar-menu">
        <li onClick={() => navigate('/home')}>All Todos</li>
        <li onClick={() => navigate('/active')}>Active Todos</li>
        <li onClick={() => navigate('/completed')}>Completed Todos</li>
        <li onClick={() => navigate('/add')}>Add Todo</li>
        <li onClick={() => navigate('/stats')}>Stats</li>
        <li onClick={() => navigate('/about')}>About</li>
        <li onClick={() => navigate('/settings')}>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
