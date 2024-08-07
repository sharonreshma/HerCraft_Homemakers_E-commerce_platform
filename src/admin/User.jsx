import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../styles/User.css'; // Ensure this CSS file is updated

const User = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'User' });

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/userregister')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Handle adding a new user
  const handleAddUser = () => {
    setShowForm(true);
  };

  // Handle form submission for new user
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Set role based on email address
    const userRole = newUser.email === 'admin1@gmail.com' ? 'Admin' : 'User';
    const userToAdd = { ...newUser, role: userRole };

    axios.post('http://localhost:8080/api/userregister/register', userToAdd)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ username: '', email: '', password: '', role: 'User' });
        setShowForm(false);
      })
      .catch(error => {
        console.error("There was an error adding the user!", error);
      });
  };

  // Handle deleting a user
  const handleDelete = (userId) => {
    axios.delete(`http://localhost:8080/api/userregister/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
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
