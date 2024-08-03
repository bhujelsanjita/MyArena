import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../component/Toast'; // Adjust the import path for your Toast component
import api from '../api/axios';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmNewPassword } = formData;

        if (newPassword !== confirmNewPassword) {
            setToast({ message: 'New passwords do not match', status: 'fail', visible: true });
            return;
        }

        try {
            const token = localStorage.getItem('userLoginToken'); // Get the token from local storage
            const response = await api.post('/user/changepassword', { currentPassword, newPassword }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setToast({ message: 'Password changed successfully', status: 'success', visible: true });
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setToast({ message: 'Error changing password. Please try again.', status: 'fail', visible: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Change Password
                    </button>
                </form>
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

export default ChangePasswordPage;
