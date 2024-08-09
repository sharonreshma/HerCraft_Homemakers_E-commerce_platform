import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ id: null, name: '', category: '', price: '', image: '' });
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/getall');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/products/add', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ id: null, name: '', category: '', price: '', image: '' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/products/update/${selectedProduct.id}`, selectedProduct);
      setProducts(products.map((product) => (product.id === response.data.id ? response.data : product)));
      setSelectedProduct(null);
      setIsEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setNewProduct({ id: null, name: '', category: '', price: '', image: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setSelectedProduct({ ...selectedProduct, image: reader.result });
        } else {
          setNewProduct({ ...newProduct, image: reader.result });
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
      color:'#ffcccc'
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
      marginBottom: '10px',
    },
    saveButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#000',
      color: '#ffcccc',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.adminPage}>
      <div style={styles.headerBar}>
        <h2>Admin Dashboard - Products</h2>
        <button
          style={styles.addProductButton}
          onClick={openAddModal}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffcccc';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000';
            e.currentTarget.style.color = '#ffcccc';
          }}
        >
          <FaPlus style={{ marginRight: '5px' }} />
          Add Product
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Image</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={hoveredRow === product.id ? { backgroundColor: '#ffe6e6' } : {}}
              onMouseEnter={() => setHoveredRow(product.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td style={styles.tableCell}>{product.id}</td>
              <td style={styles.tableCell}>{product.name}</td>
              <td style={styles.tableCell}>{product.category}</td>
              <td style={styles.tableCell}>₹{product.price}</td>
              <td style={styles.tableCell}>
                {product.image && <img src={product.image} alt={product.name} style={styles.imagePreview} />}
              </td>
              <td style={styles.tableCell}>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.actionButton, ...styles.editButton }}
                    onClick={() => openEditModal(product)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffcccc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                  >
                    <FaEdit />
                  </button>
                  <button
                    style={{ ...styles.actionButton, ...styles.deleteButton }}
                    onClick={() => handleDeleteProduct(product.id)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ffcccc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Product Modal"
        style={{ content: styles.modalContent }}
      >
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={isEditing ? selectedProduct.name : newProduct.name}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={isEditing ? selectedProduct.category : newProduct.category}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={isEditing ? selectedProduct.price : newProduct.price}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.inputField}
        />
        {isEditing && selectedProduct.image && (
          <img src={selectedProduct.image} alt="Product" style={styles.imagePreview} />
        )}
        {!isEditing && newProduct.image && (
          <img src={newProduct.image} alt="Product" style={styles.imagePreview} />
        )}
        <button style={styles.saveButton} onClick={isEditing ? handleEditProduct : handleAddProduct}>
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
      </Modal>
    </div>
  );
};

export default AdminProductPage;
