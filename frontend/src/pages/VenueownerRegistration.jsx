// src/pages/VenueOwnerRegistrationPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast';

const VenueOwnerRegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        contactNo: '',
        password: '',
        confirmPassword: '',

    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setToast({ message: 'Passwords do not match', status: 'fail', visible: true });
            return;
        }

        try {
            const response = await api.post('/admin/register', formData);
            if(response.data.success){
                var message = response.data.message;
                var toastStatus = "success";
            }else{
                var message = response.data.message;
                var toastStatus = "fail";
            }
            setToast({ message: message, status: toastStatus, visible: true });
        } catch (error) {
            setToast({ message: error.response?.data?.message || 'Registration failed. Please try again.', status: 'fail', visible: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Venue Owner Registration</h2>
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
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">ContactNo</label>
                        <input
                            type="text"
                            name="contactNo"
                            value={formData.contactNo}
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
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center items-center mt-4">
                    <Link to="/veneuowner/login" className="text-indigo-600 hover:text-indigo-800">
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

export default VenueOwnerRegistrationPage;
