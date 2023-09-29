import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from './authContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Username validation
    if (!formData.username.trim()) {
        validationErrors.username = 'Username is required';
    }

    // Email validation
    if (!formData.email.trim()) {
        validationErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        validationErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password.trim()) {
        validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        validationErrors.password = 'Password should be at least 6 characters long';
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    try {
        const response = await axios.post('http://localhost:3002/api/user', formData);
        
        console.log(response.data);
    } catch (error) {
        console.error(error.response.data);
    }
};

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
