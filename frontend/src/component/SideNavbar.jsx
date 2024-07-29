// src/components/SideNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen p-4">
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/admin" className="hover:text-gray-400">Dashboard</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/admin/venues" className="hover:text-gray-400">Manage Venues</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/admin/bookings" className="hover:text-gray-400">Manage Bookings</Link>
                    </li>
                    <li>
                        <Link to="/admin/players" className="hover:text-gray-400">Manage Players</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavbar;
