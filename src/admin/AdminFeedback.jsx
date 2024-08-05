import React, { useEffect, useState } from 'react';
import '../styles/AdminFeedback.css'; // Ensure this CSS file exists
import { FaTrash } from 'react-icons/fa'; // Import the delete icon

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Simulate fetching feedback with default entries
    const fetchFeedback = async () => {
      try {
        // Simulate API call with default data
        const defaultFeedback = [
          { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', message: 'Great service and support!' },
          { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', message: 'Very satisfied with the product quality.' },
          { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', message: 'The website is user-friendly and easy to navigate.' }
        ];
        setFeedbackList(defaultFeedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  const handleDelete = (id) => {
    // Filter out the feedback with the given id
    setFeedbackList(feedbackList.filter(feedback => feedback.id !== id));
  };

  return (
    <div className="admin-feedback-container">
      <h1 className="header">Feedback List</h1>
      <table className="feedback-table">
        <thead>
          <tr>
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
              <td colSpan="4" className="no-feedback">No feedback available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;
