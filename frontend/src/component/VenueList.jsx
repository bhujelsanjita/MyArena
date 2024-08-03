// src/components/VenueList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const VenueList = () => {
    const [venues, setVenues] = useState([]);
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await api.get('/admin/list-venue');
            setVenues(response.data.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    const handleDelete = async (slug) => {
        if (!window.confirm('Are you sure you want to delete this venue?')) return;
        try {
            const response = await api.delete(`/admin/venues/${slug}`);
            if (response.data.success) {
                setToast({ message: 'Venue deleted successfully!', status: 'success', visible: true });
                setVenues(venues.filter(venue => venue.slug !== slug));
            } else {
                setToast({ message: 'Failed to delete venue', status: 'fail', visible: true });
            }
        } catch (error) {
            console.error('Error deleting venue:', error);
            setToast({ message: 'Error deleting venue. Please try again.', status: 'fail', visible: true });
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
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Name</th>
                            <th className="text-left py-2 px-4 border-b">Address</th>
                            <th className="text-left py-2 px-4 border-b">Type</th>
                            <th className="text-left py-2 px-4 border-b">Status</th>
                            <th className="text-left py-2 px-4 border-b">Owner ID</th>
                            <th className="text-left py-2 px-4 border-b">Image</th>
                            <th className="text-left py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venues.map(venue => (
                            <tr key={venue.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{venue.name}</td>
                                <td className="py-2 px-4 border-b">{venue.address}</td>
                                <td className="py-2 px-4 border-b">{venue.type}</td>
                                <td className="py-2 px-4 border-b">{venue.status}</td>
                                <td className="py-2 px-4 border-b">{venue.ownerId}</td>
                                <td className="py-2 px-4 border-b">
                                    <img src={venue.image} alt={venue.name} className="w-32 h-32 object-cover mt-2" />
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/dashboard/venues/edit/${venue.slug}`} className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(venue.slug)} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default VenueList;
