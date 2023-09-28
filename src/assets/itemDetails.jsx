import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.title} width="200" />
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ItemDetails;
