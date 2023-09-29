import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './assets/itemList';
import ItemForm from './components/itemForm';
import UpdateForm from './components/updateItemForm';
import ItemDetails from './assets/itemDetails';
import CartPage from './components/cartPage';
import MyNavbar from './assets/navbar';
import Login from './components/login';
import Signup from './components/signup';


axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('authToken')}`;

const App = () => {
  return (
    <Router>
      <div>
        <MyNavbar />
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<ItemForm />} />
        <Route path="/update/:id" element={<UpdateForm />} />
        <Route path="/product/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
