import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import AdminHome from './screens/Admin/AdminHome';
import AdminView from './screens/Admin/AdminView';
import EmployeeHome from './screens/employee/EmployeeHome';
import { Provider } from "./components/ui/provider"

// Base URL for API endpoints
export const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <Provider>
      <Router>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                (userData?.isAdmin ? <Navigate to="/admin" /> : <Navigate to="/employee" />) : 
                <Login onLoginSuccess={handleLogin} />
            } 
          />
          <Route 
            path="/admin" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminHome userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/employees" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminView userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/employee" 
            element={
              isAuthenticated && !userData?.isAdmin ? 
                <EmployeeHome userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="*" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;