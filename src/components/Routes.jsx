// src/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
// Import other pages or components

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;
