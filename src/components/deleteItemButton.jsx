import React from 'react';
import axios from 'axios';

const DeleteButton = ({ productId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${productId}`);
      alert('Product deleted successfully!');
      //need to refresh the product list here or navigate to the home page
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
