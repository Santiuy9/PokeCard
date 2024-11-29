import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import EditDeck from './components/EditDeck';
import AddCards from './components/AddCards';

const App = () => {



    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/edit-deck" element={<EditDeck />} />
                    <Route path="/add-card" element={<AddCards />} />

                </Routes>

            </AuthProvider>
        </Router>
    );
};

export default App;
