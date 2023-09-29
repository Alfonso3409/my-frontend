import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Product not found or there was an issue fetching data.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            const response = await axios.post('http://localhost:3002/api/api/cart', {
                product_id: id,
                quantity: 1
            });
    
            if (response.status === 200) {
                alert('Product added to cart!');
            } else {
                console.error('Server Response Data:', response.data);
                alert(response.data.message || 'Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error.message);
            if (error.response) {
                console.error('Server Response Data:', error.response.data);
                console.error('Server Response Status:', error.response.status);
                console.error('Server Response Headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request made but no response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            alert('Failed to add product to cart.');
        }
    };
    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.image_url} alt={product.title} width="200" />
            <p>Category: {product.category}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ItemDetails;