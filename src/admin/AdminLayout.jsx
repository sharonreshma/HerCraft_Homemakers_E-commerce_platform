// src/admin/AdminLayout.js

import React from 'react';
import AdminNavbar from './Adminnavbar'; // Adjust the path if needed
import Footer from '../components/Footer'; // Adjust the path if needed
import Cat from './Cat';
import AdminProductsPage from './AdminProductsPage';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />

      <Cat/>
      <AdminProductsPage/>
      <Footer />
    </div>
  );
};

export default AdminLayout;
