import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
  
    const { setCurrentUser } = useAuth();
  
    useEffect(() => {
        getCartItems();
    }, []);
  
    const getCartItems = async (req, res) => {
        const userId = req.userId;
      
        try {
          const cartItems = await pool.query(
            "SELECT ci.product_id, ci.quantity, ci.price FROM cart c JOIN cart_items ci ON c.id = ci.cart_id WHERE c.user_id = $1",
            [userId]
          );
      
          res.status(200).json(cartItems.rows);
        } catch (error) {
          console.error('Error fetching cart items:', error);
          res.status(500).json({ message: "Failed to fetch cart items.", error: error.message });
        }
      };


  const handleTokenExpired = () => {
    Cookies.remove('authToken');
    
    setCurrentUser(null);
    navigate('/login');
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:3002/api/cart/${itemId}`, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3002/api/cart/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <h2>{item.product.title}</h2>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => handleUpdateQuantity(item.id, Math.max(item.quantity - 1, 1))}>-</button>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
