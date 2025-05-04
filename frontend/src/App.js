import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import AdminHome from './screens/Admin/AdminHome';
import AdminView from './screens/Admin/AdminView';
import EmployeeHome from './screens/employee/EmployeeHome';
import { Provider } from "./components/ui/provider"
import EmployeeResetPass from './screens/employee/EmployeeResetPass';
import EmployeeView from './screens/employee/EmployeeView';
import EmployeeViewPay from './screens/employee/EmployeeViewPay';
import AdminResetPass from './screens/Admin/AdminResetPass';
import AdminBatch from './screens/Admin/AdminBatch';
import AdminAdd from './screens/Admin/AdminAdd';
import AdminUpdate from './screens/Admin/AdminUpdate';
import AdminSearch from './screens/Admin/AdminSearch';
import AdminReports from './screens/Admin/AdminReports';

// Base URL for API endpoints
export const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    console.log("Login data received:", userData);
    setIsAuthenticated(true);
    setUserData(userData);
    
    console.log("User is admin:", userData?.isAdmin);
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
            path="/admin/employees/search" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminSearch userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/resetpassword" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminResetPass userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/batchraise" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminBatch userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/addemployee" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminAdd userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/updateemployee" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminUpdate userData={userData} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              isAuthenticated && userData?.isAdmin ? 
                <AdminReports userData={userData} /> : 
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
            path="/employee/resetpassword" 
            element={
              isAuthenticated && !userData?.isAdmin ? 
                <EmployeeResetPass userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/employee/profile" 
            element={
              isAuthenticated && !userData?.isAdmin ? 
                <EmployeeView userData={userData} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/employee/payhistory" 
            element={
              isAuthenticated && !userData?.isAdmin ? 
                <EmployeeViewPay userData={userData} /> : 
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