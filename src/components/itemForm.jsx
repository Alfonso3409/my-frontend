import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/products', formData);
      alert('Product added successfully!');
      // You can also refresh the product list here or navigate to the home page
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Product Name"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ItemForm;
