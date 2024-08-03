// src/pages/VenueOwnerLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast';
import venueownerauth from '../auth/venueownerauth';

const VenueOwnerLoginPage = () => {
    const navigate = useNavigate(); // Use the navigate hook from react-router-dom for redirection
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    useEffect(() => {
        if (venueownerauth()) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/admin/login', formData);
            if (response.data.success) {
                localStorage.setItem("venueOwnerLoginToken", response.data.token);
                setToast({ message: response.data.message, status: 'success', visible: true });
                setTimeout(() => {
                    setToast({ visible: false });
                    navigate("/dashboard");
                }, 1000); // Redirect after 1 second to allow the toast to display
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({
                message: error.response?.data?.message || 'Login failed. Please try again.',
                status: 'fail',
                visible: true
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Venue Owner Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center items-center mt-4">
                    <Link to="/venueowner/register" className="text-indigo-600 hover:text-indigo-800">
                        Don't have an account? Register
                    </Link>
                </div>
                {toast.visible && (
                    <Toast
                        message={toast.message}
                        status={toast.status}
                        onClose={() => setToast({ visible: false })}
                    />
                )}
            </div>
        </div>
    );
};

export default VenueOwnerLoginPage;
