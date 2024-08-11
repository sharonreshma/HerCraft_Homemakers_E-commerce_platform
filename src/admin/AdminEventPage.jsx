import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

const AdminEventPage = () => {
  const [events, setEvents] = useState([]);
  const [eventNameFilter, setEventNameFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    id: null, title: '', date: '', description: '', image: '', price: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: null, name: '', email: '', phone: '',event_name:'', paymentMethod: ''
  });
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory]);

  useEffect(() => {
    filterUsers();
  }, [users, eventNameFilter]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  const handleEventNameFilterChange = (e) => {
    setEventNameFilter(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterEvents = () => {
    // Implement filtering logic if needed
    setFilteredEvents(events);
  };

  const filterUsers = () => {
    const filtered = users.filter(user =>
      user.eventName.toLowerCase().includes(eventNameFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ id: null, title: '', date: '', description: '', image: '', price: '' });
      setIsEventModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/events/${selectedEvent.id}`, selectedEvent);
      setEvents(events.map((event) => (event.id === response.data.id ? response.data : event)));
      setSelectedEvent(null);
      setIsEditingEvent(false);
      setIsEventModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', newUser);
      setUsers([...users, response.data]);
      setNewUser({ id: null, name: '', email: '', phone: '',event_name:'', paymentMethod: '' });
      setIsUserModalOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, selectedUser);
      setUsers(users.map((user) => (user.id === response.data.id ? response.data : user)));
      setSelectedUser(null);
      setIsEditingUser(false);
      setIsUserModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEditEventModal = (event) => {
    setSelectedEvent(event);
    setIsEditingEvent(true);
    setIsEventModalOpen(true);
  };

  const openAddEventModal = () => {
    setNewEvent({ id: null, title: '', date: '', description: '', image: '', price: '' });
    setIsEditingEvent(false);
    setIsEventModalOpen(true);
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    setIsEditingUser(true);
    setIsUserModalOpen(true);
  };

  const openAddUserModal = () => {
    setNewUser({ id: null, name: '', email: '', phone: '',event_name:'', paymentMethod: '' });
    setIsEditingUser(false);
    setIsUserModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditingEvent) {
      setSelectedEvent({ ...selectedEvent, [name]: value });
    } else if (isEditingUser) {
      setSelectedUser({ ...selectedUser, [name]: value });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditingEvent) {
          setSelectedEvent({ ...selectedEvent, image: reader.result });
        } else {
          setNewEvent({ ...newEvent, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const styles = {
    adminPage: {
      padding: '20px',
      backgroundColor: 'white',
    },
    headerBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    filterAndAddContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '20px',
    },
    addProductButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffcccc',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      textAlign: 'left',
      padding: '10px',
    },
    tableCell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
    },
    actionButton: {
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      backgroundColor: '#000',
      color: '#ffcccc',
    },
    editButton: {},
    deleteButton: {},
    modalContent: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      width: '50%',
      margin: '0 auto',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    imagePreview: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      margin: '10px 0',
    },
    modalButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffcccc',
      cursor: 'pointer',
      fontSize: '16px',
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.adminPage}>
      <div style={styles.headerBar}>
        <h1>Admin Page</h1>
      </div>

      <div style={styles.sectionHeader}>
        <h2>Events</h2>
        <button style={styles.addProductButton} onClick={openAddEventModal}>
          <FaPlus style={{ marginRight: '5px' }} /> Add Event
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Image</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr
              key={event.id}
              onMouseEnter={() => setHoveredRow(event.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={styles.tableCell}>{event.title}</td>
              <td style={styles.tableCell}>{event.date}</td>
              <td style={styles.tableCell}>{event.description}</td>
              <td style={styles.tableCell}>
                <img src={event.image} alt={event.title} style={styles.imagePreview} />
              </td>
              <td style={styles.tableCell}>{event.price}</td>
              <td style={styles.tableCell}>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => openEditEventModal(event)}
                    disabled={hoveredRow !== event.id}
                  >
                    <FaEdit />
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => handleDeleteEvent(event.id)}
                    disabled={hoveredRow !== event.id}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.sectionHeader}>
        <h2>Users</h2>
        <button style={styles.addProductButton} onClick={openAddUserModal}>
          <FaPlus style={{ marginRight: '5px' }} /> Add User
        </button>
      </div>
      
      <table style={styles.table}>
        <thead>
          
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Phone</th>
            <th style={styles.tableHeader}>Event Name</th>
            <th style={styles.tableHeader}>Payment Method</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              onMouseEnter={() => setHoveredRow(user.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.phone}</td>
              <td style={styles.tableCell}>{user.eventName}</td>
              <td style={styles.tableCell}>{user.paymentMethod}</td>
              <td style={styles.tableCell}>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => openEditUserModal(user)}
                    disabled={hoveredRow !== user.id}
                  >
                    <FaEdit />
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={hoveredRow !== user.id}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Event Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onRequestClose={() => setIsEventModalOpen(false)}
        contentLabel="Event Modal"
        style={styles.modalContent}
      >
        <h2>{isEditingEvent ? 'Edit Event' : 'Add Event'}</h2>
        <input
          type="text"
          name="title"
          value={isEditingEvent ? selectedEvent.title : newEvent.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          style={styles.inputField}
        />
        <input
          type="date"
          name="date"
          value={isEditingEvent ? selectedEvent.date : newEvent.date}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <textarea
          name="description"
          value={isEditingEvent ? selectedEvent.description : newEvent.description}
          onChange={handleInputChange}
          placeholder="Event Description"
          style={styles.inputField}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {isEditingEvent && selectedEvent.image && (
          <img src={selectedEvent.image} alt="Event Preview" style={styles.imagePreview} />
        )}
        <input
          type="text"
          name="price"
          value={isEditingEvent ? selectedEvent.price : newEvent.price}
          onChange={handleInputChange}
          placeholder="Event Price"
          style={styles.inputField}
        />
        <button
          style={styles.modalButton}
          onClick={isEditingEvent ? handleEditEvent : handleAddEvent}
        >
          {isEditingEvent ? 'Update Event' : 'Add Event'}
        </button>
        <button
          style={styles.modalButton}
          onClick={() => setIsEventModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>

      {/* User Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onRequestClose={() => setIsUserModalOpen(false)}
        contentLabel="User Modal"
        style={styles.modalContent}
      >
        <h2>{isEditingUser ? 'Edit User' : 'Add User'}</h2>
        <input
          type="text"
          name="name"
          value={isEditingUser ? selectedUser.name : newUser.name}
          onChange={handleInputChange}
          placeholder="User Name"
          style={styles.inputField}
        />
        <input
          type="email"
          name="email"
          value={isEditingUser ? selectedUser.email : newUser.email}
          onChange={handleInputChange}
          placeholder="User Email"
          style={styles.inputField}
        />
        <input
          type="tel"
          name="phone"
          value={isEditingUser ? selectedUser.phone : newUser.phone}
          onChange={handleInputChange}
          placeholder="User Phone"
          style={styles.inputField}
        />
        <input
    type="text"
    name="event_name"
    value={isEditingUser ? selectedUser.event_name : newUser.event_name}
    onChange={handleInputChange}
    placeholder="Event Name"
    style={styles.inputField}
  />
        <input
          type="text"
          name="paymentMethod"
          value={isEditingUser ? selectedUser.paymentMethod : newUser.paymentMethod}
          onChange={handleInputChange}
          placeholder="Payment Method"
          style={styles.inputField}
        />
        <button
          style={styles.modalButton}
          onClick={isEditingUser ? handleEditUser : handleAddUser}
        >
          {isEditingUser ? 'Update User' : 'Add User'}
        </button>
        <button
          style={styles.modalButton}
          onClick={() => setIsUserModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default AdminEventPage;
