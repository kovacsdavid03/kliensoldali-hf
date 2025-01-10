import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AppLayout.css';

/**
 * Props for the AppLayout component.
 * @property {React.ReactNode} children - The content to be displayed within the layout.
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * AppLayout component that provides a layout structure with a sidebar and main content area.
 * @param {AppLayoutProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AppLayout component.
 */
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">{children}</div>
    </div>
  );
};

export default AppLayout;
