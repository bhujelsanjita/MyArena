// src/components/VenueInfo.jsx
import React from 'react';

const VenueInfo = ({ name, location, price, description }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600">{location}</p>
            <p className="text-gray-800 font-semibold mt-2">Price: ${price} / hour</p>
            <p className="mt-4">{description}</p>
        </div>
    );
};

export default VenueInfo;
