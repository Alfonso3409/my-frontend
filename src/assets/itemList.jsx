import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from '../components/deleteItemButton';

const ItemList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {products.map(product => (
        <div key={product.id} style={cardStyle}>
          <img src={product.image} alt={product.title} style={imageStyle} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  margin: '10px',
  padding: '10px',
  width: '250px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  borderRadius: '5px',
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
  }
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '5px 5px 0 0'
};

export default ItemList;
