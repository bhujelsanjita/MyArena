// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the email to the backend for processing
        // For example: axios.post('/api/forgot-password', { email })
        console.log(`Password reset email sent to: ${email}`);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>
                {submitted ? (
                    <p className="text-center text-green-600">An email with a password reset link has been sent. Please check your email.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
