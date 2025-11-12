import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './Context/authContext';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import AdminPage from './Pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
