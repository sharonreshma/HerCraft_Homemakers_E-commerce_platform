import React, { useState } from 'react';
import '../styles/AdminProductsPage.css'; // Assume we have a CSS file for styling
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

function AdminProductPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      if (isEditing) {
        setProducts(products.map(product => 
          product.id === currentProductId ? { ...newProduct, id: product.id } : product
        ));
        setIsEditing(false);
        setCurrentProductId(null);
      } else {
        const newProductWithId = { ...newProduct, id: Date.now() };
        setProducts([...products, newProductWithId]);
      }
      setNewProduct({ name: '', price: '', description: '' });
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct({ name: product.name, price: product.price, description: product.description });
    setIsEditing(true);
    setCurrentProductId(product.id);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    if (isEditing && currentProductId === productId) {
      setIsEditing(false);
      setCurrentProductId(null);
      setNewProduct({ name: '', price: '', description: '' });
    }
  };

  return (
    <div className="admin-product-page">
      <h1>Admin Product Management</h1>

      <div className="add-product-form">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={handleAddProduct}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="product-item">
              <div>
                <p><strong>{product.name}</strong></p>
                <p>Price: ${product.price}</p>
                <p>{product.description}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEditProduct(product)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default AdminProductPage;
