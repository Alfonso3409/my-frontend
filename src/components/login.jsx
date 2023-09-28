import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from './authContext';


const Login = () => {
    const { setCurrentUser } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.username.trim()) {
            validationErrors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3002/api/login', formData);
            setCurrentUser(response.data.user); 

            // Store the JWT in a cookie
            Cookies.set('authToken', response.data.token); 

            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;