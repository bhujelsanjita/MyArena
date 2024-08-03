// src/pages/UserLoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast';
import UserAuth from '../auth/userauth';

const UserLoginPage = () => {
    // console.log(sessionStorage.getItem("isBooking"));

    if(UserAuth()){
        let isBooking = JSON.parse(sessionStorage.getItem("isBooking"));
        console.log(isBooking);
        if(isBooking?.booking){
            window.location.href = isBooking.returnUrl;
        }
        else{

        
        // console.log("sanjita",localStorage.getItem("userLoginToken"));
        window.location.href = "/user-dashboard";
        }


    }
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const loginResponse = await api.post("/user/login",formData);
            console.log(loginResponse);
            if(loginResponse.data.success){
                var message = loginResponse.data.message;
                var toastStatus = "success";
                localStorage.setItem("userLoginToken",loginResponse.data.token);

            }else{
                var message = loginResponse.data.message;
                var toastStatus = "fail";
            }

        setToast({ message: message, status: toastStatus, visible: true });
        }
        catch(err){
            console.log(err);
            setToast({ message: "Something went wrong!", status: "fail", visible: true });
            
        }

        

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Login</h2>
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
                <div className="flex justify-between items-center mt-4">
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
                        Don't have an account?
                    </Link>
                    <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
                        Forgot Password?
                    </Link>
                </div>
            </div>
            {toast.visible && (
                    <Toast
                        message={toast.message}
                        status={toast.status}
                        onClose={() => setToast({ ...toast, visible: false })}
                    />
                )}
        </div>
        
    );
};

export default UserLoginPage;
