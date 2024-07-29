// src/components/VenueList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const VenueList = () => {
    // Sample venue data
    const venues = [
        { id: 1, name: 'Downtown Stadium', location: 'Downtown', price: '$50/hour' },
        { id: 2, name: 'City Arena', location: 'Uptown', price: '$75/hour' },
        // More venues...
    ];

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Venues</h2>
                <Link to="/admin/venues/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add New Venue
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <ul>
                    {venues.map(venue => (
                        <li key={venue.id} className="border-b last:border-b-0 py-2">
                            <div><strong>Name:</strong> {venue.name}</div>
                            <div><strong>Location:</strong> {venue.location}</div>
                            <div><strong>Price:</strong> {venue.price}</div>
                            <div className="flex justify-end mt-2">
                                <button className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg">Edit</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VenueList;
