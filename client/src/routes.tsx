import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default AppRoutes;
