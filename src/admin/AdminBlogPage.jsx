import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminBlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ id: null, title: '', date: '', author: '', content: '', image: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts'); // Adjust the endpoint as needed
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prevState) => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  const handleAddPost = async () => {
    try {
      const { title, date, author, content, image } = newPost;
      await axios.post('http://localhost:8080/api/posts', { title, date, author, content, image }); // Adjust the endpoint as needed
      fetchPosts();
      setNewPost({ id: null, title: '', date: '', author: '', content: '', image: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`); // Adjust the endpoint as needed
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async () => {
    try {
      const { id, title, date, author, content, image } = editingPost;
      await axios.put(`http://localhost:8080/api/posts/${id}`, { title, date, author, content, image }); // Adjust the endpoint as needed
      fetchPosts();
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <Container>
      <Header>Admin Blog Management</Header>
      <Main>
        <ButtonContainer>
          <button type="button" onClick={() => setShowAddForm(prev => !prev)}>
            <FaPlus /> {showAddForm ? 'Cancel' : 'Add Blog'}
          </button>
        </ButtonContainer>

        {showAddForm && (
          <Section>
            <SectionHeader>Add New Post</SectionHeader>
            <Form>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={newPost.date}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={newPost.author}
                onChange={handleInputChange}
              />
              <textarea
                name="content"
                placeholder="Content"
                value={newPost.content}
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
              />
              <button type="button" onClick={handleAddPost}>
                <FaPlus /> Add Post
              </button>
            </Form>
          </Section>
        )}

        <Section>
          <SectionHeader>Existing Posts</SectionHeader>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Author</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.image && <PostImage src={post.image} alt={post.title} />}</td>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>{post.author}</td>
                  <td>{post.content}</td>
                  <td>
                    <ActionButton onClick={() => setEditingPost(post)}>
                      <FaEdit /> 
                    </ActionButton>
                    <ActionButton onClick={() => handleDeletePost(post.id)}>
                      <FaTrash /> 
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        {editingPost && (
          <Section>
            <SectionHeader>Edit Post</SectionHeader>
            <Form>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={editingPost.date}
                onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={editingPost.author}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
              />
              <textarea
                name="content"
                placeholder="Content"
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              />
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditingPost((prev) => ({ ...prev, image: reader.result }));
                    };
                    reader.readAsDataURL(file); // Convert file to base64 string
                  }
                }}
              />
              <button type="button" onClick={handleEditPost}>
                <FaEdit /> Update Post
              </button>
            </Form>
          </Section>
        )}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #ffcccc;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  
  button {
    background-color: #000;
    border: none;
    color: #ffcccc;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const SectionHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input, textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  button {
    background-color: #FFCCCC;
    border: none;
    color: black;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    vertical-align: top;
  }
`;

const PostImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
`;

const ActionButton = styled.button`
  background-color: #FFCCCC;
  border: none;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 10px;

  &:hover {
    background-color: #000;
    color: #ffcccc;
  }
`;

export default AdminBlogPage;
