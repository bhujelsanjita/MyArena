// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        contactNo: '',
        address: '',
    });

    useEffect(() => {
        // Fetch profile data from backend
        // For now, we use sample data
        setProfile({
            name: 'John Doe',
            email: 'john.doe@example.com',
            contactNo: '123-456-7890',
            address: '123 Main Street, City, Country',
        });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Contact Number:</strong> {profile.contactNo}</p>
                <p><strong>Address:</strong> {profile.address}</p>
            </div>
        </div>
    );
};

export default Profile;
