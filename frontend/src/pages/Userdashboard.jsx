// src/pages/UserDashboard.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <nav className="bg-white w-1/4 p-6 shadow-md">
                <ul>
                    <li className="mb-4">
                        <Link to="/user-dashboard/manage-bookings" className="text-indigo-600 hover:text-indigo-800">
                            Manage Bookings
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/user-dashboard/change-password" className="text-indigo-600 hover:text-indigo-800">
                            Change Password
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/user-dashboard/profile" className="text-indigo-600 hover:text-indigo-800">
                            Profile
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/user-dashboard/logout" className="text-indigo-600 hover:text-indigo-800">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;
