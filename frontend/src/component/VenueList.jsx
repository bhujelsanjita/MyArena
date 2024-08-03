// src/components/VenueList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const VenueList = () => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await api.get('/venues');
            setVenues(response.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/venues/${id}`);
            setVenues(venues.filter(venue => venue.id !== id));
        } catch (error) {
            console.error('Error deleting venue:', error);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Venues</h2>
                <Link to="/dashboard/venues/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add New Venue
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <ul>
                    {venues.map(venue => (
                        <li key={venue.id} className="border-b last:border-b-0 py-2">
                            <div><strong>Name:</strong> {venue.name}</div>
                            <div><strong>Address:</strong> {venue.address}</div>
                            <div><strong>Type:</strong> {venue.type}</div>
                            <div><strong>Status:</strong> {venue.status}</div>
                            <div><strong>Owner ID:</strong> {venue.ownerId}</div>
                            <div><strong>Image:</strong>
                                <img src={venue.image} alt={venue.name} className="w-32 h-32 object-cover mt-2" />
                            </div>
                            <div className="flex justify-end mt-2">
                                <Link to={`/dashboard/venues/edit/${venue.id}`} className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(venue.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VenueList;
