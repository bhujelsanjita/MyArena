// src/components/SideNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen p-4">
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/dashboard/venues" className="hover:text-gray-400">Manage Venues</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/dashboard/bookings" className="hover:text-gray-400">Manage Bookings</Link>
                    </li>
                   
                    <li className="mb-4">
                        <Link to="/dashboard/logout" className="hover:text-gray-400">LogOut</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavbar;
