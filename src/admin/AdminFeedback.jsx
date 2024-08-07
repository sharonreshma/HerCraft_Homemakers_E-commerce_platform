import React, { useEffect, useState } from 'react';
import '../styles/AdminFeedback.css'; // Ensure this CSS file exists
import { FaTrash } from 'react-icons/fa'; // Import the delete icon

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback from the backend
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/contact'); // Adjust URL if needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedbackList(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the backend to delete the feedback
      const response = await fetch(`http://localhost:8080/api/contact/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Update the feedback list after successful deletion
        setFeedbackList(feedbackList.filter(feedback => feedback.id !== id));
      } else {
        throw new Error('Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="admin-feedback-container">
      <h1 className="header">Feedback List</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.message}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(feedback.id)}>
                    <FaTrash className="icon" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-feedback">No feedback available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;
