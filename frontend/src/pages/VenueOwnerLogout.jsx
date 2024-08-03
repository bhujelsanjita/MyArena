// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VenueOwnerLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user authentication data, e.g., tokens or user info
        localStorage.removeItem('venueOwnerLoginToken'); // Example: removing token from localStorage
        // localStorage.removeItem('userData'); // Example: removing user data

        // Redirect to the login page or home page
        navigate('/venueowner/login'); // Redirect to the login page after logout
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p>Logging out...</p>
        </div>
    );
};

export default VenueOwnerLogout;
