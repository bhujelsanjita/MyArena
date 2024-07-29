// src/pages/UserRegistrationPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../component/Toast';
import api from '../api/axios';

const UserRegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        address: '',
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await api.post('/user/registration', formData);
            console.log(response.data);
            if(response.data.status){
                var message = response.data.message;
                var toastStatus = "success";
            }else{
                var message = response.data.message;
                var toastStatus = "fail";
            }
            setToast({ message: message, status: toastStatus, visible: true });
        } catch (error) {
            console.error('Registration error:', error); // Log the error to the console
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error data:', error.response.data);
                setToast({ message: error.response.data.message || 'Registration failed. Please try again.', status: 'fail', visible: true });
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
                setToast({ message: 'No response from server. Please check your network and try again.', status: 'fail', visible: true });
            } else {
                // Something else happened
                console.error('Error', error.message);
                setToast({ message: 'An error occurred. Please try again later.', status: 'fail', visible: true });
            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
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
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            rows="3"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center items-center mt-4">
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
                        Already have an account?
                    </Link>
                </div>
                {toast.visible && (
                    <Toast
                        message={toast.message}
                        status={toast.status}
                        onClose={() => setToast({ ...toast, visible: false })}
                    />
                )}
            </div>
        </div>
    );
};

export default UserRegistrationPage;
