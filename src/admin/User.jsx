import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/User.css'; // Ensure this CSS file is updated

// Sample user data with password field
const initialUsers = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password123' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password456' },
  { id: 3, username: 'user3', email: 'user3@example.com', password: 'password789' },
];

const User = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'User' });

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ username: '', email: '', password: '', role: 'User' });
    setShowForm(false);
  };

  return (
    <div className="aduser-management">
      <h2>User Management</h2>
      <button className="adbtn adbtn-primary" onClick={handleAddUser}>
        <FaPlus className="adicon" /> Add New User
      </button>
      {showForm && (
        <>
          <p className="aduser-form-message">Please fill out the form to add a new user.</p>
          <form className="aduser-form" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button type="submit" className="adbtn adbtn-primary">Submit</button>
          </form>
        </>
      )}
      <table className="aduser-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role || 'User'}</td>
              <td>
                <button className="adbtn adbtn-danger" onClick={() => handleDelete(user.id)}>
                  <FaTrash className="adicon" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
