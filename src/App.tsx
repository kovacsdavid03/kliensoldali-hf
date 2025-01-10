import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomeScreen from './components/Home/HomeScreen';
import AddTodo from './components/Todo/AddTodo';
import AppLayout from './components/Layout/AppLayout';
import ActiveTodo from './components/ActiveTodo/ActiveTodo';
import CompletedTodo from './components/CompletedTodo/CompletedTodo';
import Settings from './components/Settings/Settings';
import ChangeEmail from './components/Settings/Email/ChangeEmail';
import ChangeUser from './components/Settings/User/ChangeUser';
import ChangePassword from './components/Settings/Password/ChangePassword';
import Stats from './components/Stats/Stats';
import About from './components/About/About';

/**
 * App component that sets up the routing for the application.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes without the Sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with the Sidebar */}
        <Route
          path="/home"
          element={
            <AppLayout>
              <HomeScreen />
            </AppLayout>
          }
        />
        <Route
          path="/add"
          element={
            <AppLayout>
              <AddTodo />
            </AppLayout>
          }
        />
        <Route
          path="/active"
          element={
            <AppLayout>
              <ActiveTodo />
            </AppLayout>
          }
        />
        <Route
          path="/completed"
          element={
            <AppLayout>
              <CompletedTodo />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
        <Route
          path="/settings/change-email"
          element={
            <AppLayout>
              <ChangeEmail />
            </AppLayout>
          }
        />
        <Route
          path="/settings/change-username"
          element={
            <AppLayout>
              <ChangeUser />
            </AppLayout>
          }
        />
        <Route
          path="/settings/change-password"
          element={
            <AppLayout>
              <ChangePassword />
            </AppLayout>
          }
        />
        <Route
         path="/stats"
          element={
            <AppLayout>
              <Stats />
            </AppLayout>
          }
        />
        <Route
          path="/about"
          element={
            <AppLayout>
              <About />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
